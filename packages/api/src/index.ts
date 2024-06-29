import { Hono, Context } from 'hono';
import { cors } from 'hono/cors';
import { showRoutes } from 'hono/dev'
import { poweredBy } from 'hono/powered-by'
import { prettyJSON } from 'hono/pretty-json';

type Env = {
  PJPDB: D1Database
}

const app = new Hono<{
  Bindings: Env
}>();

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

app.get('/health', async (c: Context) => {
  return c.text("OK")
})

app.post("/access", async (c: Context<{
  Bindings: Env
}>) => {
  const { id, name } = await c.req.json();
  const { results } = await c.env.PJPDB
    .prepare("SELECT * FROM users WHERE id = ?")
    .bind(id)
    .all();

  if (results.length === 0) {
    await c.env.PJPDB
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
})

app.post("/:id/addWallet", async (c: Context<{
  Bindings: Env
}>) => {
  const { id } = c.req.param();
  const { wallet_id } = await c.req.json();

  await c.env.PJPDB
    .prepare("UPDATE users SET wallet_id = ? WHERE id = ?")
    .bind(wallet_id)
    .bind(id)
    .run();

  return c.json({
    message: "updated",
    wallet_id
  })
})

app.get("/:id/transactions", async (c: Context<{
  Bindings: Env
}>) => {
  const { results } = await c.env.PJPDB
    .prepare("SELECT wallet_id FROM users WHERE id = ?")
    .bind(c.req.param("id"))
    .all();

  if (results.length === 0) {
    return c.json({
      message: "not found",
    })
  }

  const { wallet_id } = results[0];

  const { 
    results: credits
   } = await c.env.PJPDB
    .prepare("SELECT * FROM transactions WHERE reciever_wallet_id = ?")
    .bind(wallet_id)
    .all();

  const {
    results: debits
  } = await c.env.PJPDB
    .prepare("SELECT * FROM transactions WHERE sender_wallet_id = ?")
    .bind(wallet_id)
    .all();

  return c.json({
    credits,
    debits
  })
})

app.get("/transactions/:id", async (c: Context<{
  Bindings: Env
}>) => {
  const { results } = await c.env.PJPDB
    .prepare("SELECT * FROM transactions WHERE id = ?")
    .bind(c.req.param("id"))
    .all();

  if (results.length === 0) {
    return c.json({
      message: "not found",
    })
  }

  return c.json(results[0])
});

showRoutes(app)

export default app
