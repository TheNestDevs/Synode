import fs from 'fs';
import { Hono, Context } from 'hono';
import { cors } from 'hono/cors';
import { showRoutes } from 'hono/dev'
import { poweredBy } from 'hono/powered-by'
import { prettyJSON } from 'hono/pretty-json';
import DataBase from 'better-sqlite3'
import { SnowflakeId } from "hyperflake"

import { Certagri } from "@project-p/certagri-js"

const keyPair = await Certagri.generateKeyPairC();
const snowflakeGen = SnowflakeId();

const sql = DataBase("pjp.db");
const migration = fs.readFileSync('schema.sql', 'utf8');
sql.exec(migration);

const app = new Hono();

app.use(cors());
app.use(poweredBy());
app.use(prettyJSON())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/', async (c: Context) => {
  return c.json({
      message: "Welcome PJP API",
  })
})

app.get("/public-key", async (c: Context) => {
  const publicKey = await keyPair.publicKey;
  return c.json(publicKey)
})

app.get('/health', async (c: Context) => {
  return c.text("OK")
})

app.post("/access", async (c: Context) => {
  const { id, name } = await c.req.json();
  const results
   = await sql
    .prepare("SELECT * FROM users WHERE id = ?")
    .bind(id)
    .all() as { id: string, name: string, wallet_id: string }[];

  if (results.length === 0) {
    await sql
      .prepare("INSERT INTO users (id,name) VALUES (?,?)")
      .bind(id)
      .bind(name)
      .run();

    return c.json({
      message: "created",
      wallet_id: null,
    })
  }
  else {
    return c.json({
      message: "exists",
      wallet_id: results[0].wallet_id,
    })
  }
});

app.get("/:id/key", async (c: Context) => {
  const { id } = c.req.param();

  const results = await sql
    .prepare("SELECT public_key FROM users WHERE id = ?")
    .bind(id)
    .all() as { public_key: string }[];

  if (results.length === 0) {
    return c.json({
      message: "not found",
    })
  }

  return c.json(results[0])
})

app.post("/:id/key", async (c: Context) => {
  const { public_key } = await c.req.json();
  
  await sql
    .prepare("UPDATE users SET public_key = ? WHERE id = ?")
    .bind(public_key)
    .bind(c.req.param("id"))
    .run();

  return c.json({
    message: "updated",
  })
})

app.post("/:id/addWallet", async (c: Context) => {
  const { id } = c.req.param();
  const { wallet_id } = await c.req.json();

  await sql
    .prepare("UPDATE users SET wallet_id = ? WHERE id = ?")
    .bind(wallet_id)
    .bind(id)
    .run();

  return c.json({
    message: "updated",
    wallet_id
  })
})

app.get("/:id/transactions", async (c: Context) => {
  const results = await sql
    .prepare("SELECT wallet_id FROM users WHERE id = ?")
    .bind(c.req.param("id"))
    .all() as { wallet_id: string }[];

  if (results.length === 0) {
    return c.json({
      message: "not found",
    })
  }

  const { wallet_id } = results[0];

  const credits = await sql
    .prepare("SELECT * FROM transactions WHERE reciever_wallet_id = ?")
    .bind(wallet_id)
    .all() as { id: string, sender_wallet_id: string, reciever_wallet_id: string, transacion_time: string, sync_time: string, amount: string, created_at: string }[];

  const debits = await sql
    .prepare("SELECT * FROM transactions WHERE sender_wallet_id = ?")
    .bind(wallet_id)
    .all() as { id: string, sender_wallet_id: string, reciever_wallet_id: string, transacion_time: string, sync_time: string, amount: string, created_at: string }[];

  return c.json({
    credits,
    debits
  })
})

app.get("/transaction/:id", async (c: Context) => {
  const results = await sql
    .prepare("SELECT * FROM transactions WHERE id = ?")
    .bind(c.req.param("id"))
    .all() as { id: string, sender_wallet_id: string, reciever_wallet_id: string, transacion_time: string, sync_time: string, amount: string, created_at: string }[];

  if (results.length === 0) {
    return c.json({
      message: "not found",
    })
  }

  return c.json(results[0])
});

interface SyncReq {
  snowflake_id: string;
  sender_id: string;
  reciever_id: string;
  transaction_cert: string;
  approver_cert: string;
}

const decryptCert = async (cert: string, privateKey: string, publicKey: string) => {
  const decrypted = await Certagri.decryptMessage({
    encryptedMessage: cert,
    privateKeyArmored: privateKey,
    publicKeyArmored: publicKey,
    passphrase: ""
  });

  return JSON.parse(decrypted.data as string);
}

app.post("/sync", async (c: Context) => {
  const syncReq = await c.req.json<SyncReq[]>();

  Promise.all(syncReq.map(async (req) => {
    const { snowflake_id, sender_id, reciever_id, transaction_cert, approver_cert } = req;

    const sender_data = await sql
      .prepare("SELECT public_key FROM users WHERE id = ?")
      .bind(sender_id)
      .all() as { public_key: string }[];

    // transaction_cert
    // decode 
    // 1. decrypt transaction_cert with server private key
    // 2. verify transaction_cert with sender_id public key
    // { amount: string }
    const decryptedTransactionCert = await decryptCert(transaction_cert, String(keyPair.privateKey), String(sender_data[0].public_key));

    // approver_cert
    // decode
    // 1. decrypt approver_cert with server private key
    // 2. verify approver_cert with sender_id public key
    // { receiver_key: string }
    const decryptedApproverCert = await decryptCert(approver_cert, String(keyPair.privateKey), String(sender_data[0].public_key));

    // check if transaction is already in the database
    const results = await sql
      .prepare("SELECT * FROM transactions WHERE id = ?")
      .bind(snowflake_id)
      .all() as { id: string, sender_wallet_id: string, reciever_wallet_id: string, transacion_time: string, sync_time: string, amount: string, created_at: string }[];

    if (results.length > 0) {
      return
    }

    // insert transaction into database
    await sql
      .prepare("INSERT INTO transactions (id, sender_wallet_id, reciever_wallet_id, amount) VALUES (?,?,?,?)")
      .bind(snowflake_id)
      .bind(decryptedTransactionCert.sender_id)
      .bind(reciever_id)
      .bind(decryptedTransactionCert.amount)
      .run();

    // update sync time
    await sql
      .prepare("UPDATE transactions SET sync_time = CURRENT_TIMESTAMP WHERE id = ?")
      .bind(snowflake_id)
      .run();
      
    // logic for updating wallet allowance here
    // ???
  }));

  return c.json({
    message: "syncing",
  })
})

showRoutes(app)

export default app
