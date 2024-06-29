import { expect, test } from 'vitest'
import { Certagri } from "./core"

const certAgri = Certagri;

const message = 'Hello, World!';

const user_1_pgp = await certAgri.newEntity({
    email: 'hi@b68web.dev',
    name: 'jyotirmoy',
    passphrase: '12345678'
});
const user_2_pgp = await certAgri.newEntity({
    email: 'praty@darkfalc0n.io',
    name: 'Pratyay',
    passphrase: '12345678'
});

const user_1 = await certAgri.generateKeyPairC();
const user_2 = await certAgri.generateKeyPairC();

test('Check for PGP Message Enc/Dec', async () => {
    const encryptMessage = await certAgri.encryptMessage({
        messageToEncrypt: message,
        publicKeyArmored: user_2_pgp.publicKey
    })
    
    const decryptedMessage = await certAgri.decryptMessage({
        encryptedMessage: String(encryptMessage),
        privateKeyArmored: user_2_pgp.privateKey,
        publicKeyArmored: user_2_pgp.publicKey,
        passphrase: '12345678'
    })

    expect(String(decryptedMessage.data)).toBe(message)
})

test('Check for PGP Message Sign/Verify', async () => {
    const signMessage = await certAgri.signMessage({
        messageToSign: message,
        privateKeyArmored: user_1_pgp.privateKey,
        passphrase: '12345678'
    })
    
    const verifyMessage = await certAgri.verifySignature({
        messageToVerify: signMessage,
        publicKeyArmored: user_1_pgp.publicKey, 
    })

    expect(verifyMessage.data).toBe(message)
})

test('Check for PGP Message Sign/Verify Detached', async () => {
    const signMessage = await certAgri.signMessageDetached({
        messageToSign: message,
        privateKeyArmored: user_1_pgp.privateKey,
        passphrase: '12345678'
    })
    
    const verifyMessage = await certAgri.verifySignatureDetached({
        messageToVerify: message,
        publicKeyArmored: user_1_pgp.publicKey,
        signatureForMessage: String(signMessage)
    })
    
    expect(verifyMessage.data).toBe(message)
})

test('Check for PGP Whoami PublicKey', async () => {
    const whoamiPublicKey = await certAgri.whoamiPublicKey({
        publicKeyArmored: user_1_pgp.publicKey
    })

    const whoamiUser = await whoamiPublicKey.user.userID
    expect(whoamiUser?.name).toBe('jyotirmoy')
})

test('Check for PGP Whoami PrivateKey', async () => {
    const whoamiPublicKey = await certAgri.whoamiPrivateKey({
        privateKeyArmored: user_2_pgp.privateKey
    })

    const whoamiUser = await whoamiPublicKey.user.userID
    expect(whoamiUser?.email).toBe('praty@darkfalc0n.io')
})

test('Check for Generate Key Pair', async () => {
    const keyPair = await certAgri.generateKeyPairC();
    expect(keyPair.publicKey).toBeDefined()
    expect(keyPair.privateKey).toBeDefined()
})

test('Check for Encrypt/Decrypt Message', async () => {
    const encryptMessage = await certAgri.encryptMessageC({
        messageToEncrypt: message,
        recieverPublicKey: user_2.publicKey
    })
    expect(encryptMessage).toBeDefined()

    const decryptedMessage = await certAgri.decryptMessageC({
        messageToDecrypt: encryptMessage,
        recieverPrivateKey: user_2.privateKey
    })
    expect(decryptedMessage).toBeDefined()
    expect(decryptedMessage).toBe(message)
})

test('Check for Sign/Verify Message', async () => {
    const signature = await certAgri.signMessageC({
        messageToSign: message,
        senderPrivateKey: user_1.privateKey
    })

    const verify = await certAgri.verifySignatureC({
        messageToVerify: message,
        signatureForMessage: signature,
        senderPublicKey: user_1.publicKey
    })

    expect(verify).toBe(true)
})