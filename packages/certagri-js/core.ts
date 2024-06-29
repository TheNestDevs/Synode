import { 
    generateKeyPairSync,
    createSign, 
    createVerify,
    publicEncrypt, 
    constants,
    privateDecrypt,
} from 'crypto';
import type { KeyObject } from 'node:crypto';

import {
    generateKey,
    verify,
    sign,
    readPrivateKey,
    readSignature,
    createCleartextMessage,
    createMessage,
    readKey,
    encrypt,
    decrypt,
    readMessage,
    decryptKey,
    readCleartextMessage
} from 'openpgp';

export class Certagri {
    public static newEntity({
        name,
        email,
        passphrase
    }: {
        name: string;
        email: string;
        passphrase: string;
    }) {
        return generateKey({
            curve: 'ed25519',
            userIDs: [{ name, email}],
            format: 'armored',
            passphrase
        });
    }

    public static async whoamiPublicKey({
        publicKeyArmored
    }: {
        publicKeyArmored: string;
    }) {
        const publicKey = await readKey({ armoredKey: publicKeyArmored });
        return publicKey.getPrimaryUser();
    }

    public static async whoamiPrivateKey({
        privateKeyArmored
    }: {
        privateKeyArmored: string;
    }) {
        const privateKey = await readPrivateKey({ armoredKey: privateKeyArmored });
        return privateKey.getPrimaryUser();
    }

    public static async encryptMessage({
        messageToEncrypt,
        publicKeyArmored
    }: {
        messageToEncrypt: string;
        publicKeyArmored: string;
    }) {
        const publicKey = await readKey({ armoredKey: publicKeyArmored });
        return encrypt({
            message: await createMessage({ text: messageToEncrypt }),
            encryptionKeys: publicKey,
        });
    }

    public static async decryptMessage({
        encryptedMessage,
        privateKeyArmored,
        publicKeyArmored,
        passphrase
    }: {
        encryptedMessage: string;
        privateKeyArmored: string;
        publicKeyArmored: string;
        passphrase: string;
    }) {
        const privateKey = await decryptKey({ 
            privateKey: await readPrivateKey({ armoredKey: privateKeyArmored }),
            passphrase
        });
        
        const publicKey = await readKey({ armoredKey: publicKeyArmored });
        
        return decrypt({
            message: await readMessage({ armoredMessage: encryptedMessage }),
            verificationKeys: publicKey,
            decryptionKeys: privateKey,
        });
    }

    public static async signMessage({
        messageToSign,
        privateKeyArmored,
        passphrase
    }: {
        messageToSign: string;
        privateKeyArmored: string;
        passphrase: string;
    }) {
        const privateKey = await decryptKey({ 
            privateKey: await readPrivateKey({ armoredKey: privateKeyArmored }),
            passphrase
        });

        return sign({
            message: await createCleartextMessage({ text: messageToSign }),
            signingKeys: privateKey,
        });
    }

    public static async signMessageDetached({
        messageToSign,
        privateKeyArmored,
        passphrase
    } : {
        messageToSign: string;
        privateKeyArmored: string;
        passphrase: string;
    }) {
        const privateKey = await decryptKey({ 
            privateKey: await readPrivateKey({ armoredKey: privateKeyArmored }),
            passphrase
        });

        return sign({
            message: await createMessage({ text: messageToSign }),
            signingKeys: privateKey,
            detached: true,
        });
    }

    public static async verifySignature({
        messageToVerify,
        publicKeyArmored
    }: {
        messageToVerify: string;
        publicKeyArmored: string;
    }) {
        const publicKey = await readKey({ armoredKey: publicKeyArmored });
        return verify({
            message: await readCleartextMessage({
                cleartextMessage: messageToVerify
            }),
            verificationKeys: publicKey
        });
    
    }

    public static async verifySignatureDetached({
        messageToVerify,
        signatureForMessage,
        publicKeyArmored
    }: {
        messageToVerify: string;
        signatureForMessage: string;
        publicKeyArmored: string;
    }) {
        const publicKey = await readKey({ armoredKey: publicKeyArmored });
        return verify({
            message: await createMessage({ text: messageToVerify }),
            signature: await readSignature({ armoredSignature: signatureForMessage }),
            verificationKeys: publicKey
        });
    }

    public static generateKeyPairC(): {
        publicKey: KeyObject;
        privateKey: KeyObject;
    } {
        return generateKeyPairSync('rsa', {
            modulusLength: 2048,
        });
    }


    public static encryptMessageC({
        recieverPublicKey,
        messageToEncrypt
    }: {
        recieverPublicKey: KeyObject;
        messageToEncrypt: string;
    }) {
        return publicEncrypt({
            key: recieverPublicKey,
            padding: constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        }, Buffer.from(messageToEncrypt, 'utf8')).toString('base64');
    }

    public static decryptMessageC({
        recieverPrivateKey,
        messageToDecrypt
    }: {
        recieverPrivateKey: KeyObject;
        messageToDecrypt: string;
    }) {
        return privateDecrypt({
            key: recieverPrivateKey,
            padding: constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        }, Buffer.from(messageToDecrypt, 'base64')).toString('utf8');
    }

    public static signMessageC({
        senderPrivateKey,
        messageToSign
    }: {
        senderPrivateKey: KeyObject,
        messageToSign: string
    }) {
        const sign = createSign('RSA-SHA256');
        sign.update(messageToSign);
        sign.end();

        return sign.sign(senderPrivateKey).toString('base64');
    }

    public static verifySignatureC({
        senderPublicKey,
        messageToVerify,
        signatureForMessage
    }: {
        senderPublicKey: KeyObject,
        messageToVerify: string,
        signatureForMessage: string
    }) {
        const verify = createVerify('RSA-SHA256');
        verify.update(messageToVerify);
        verify.end();

        return verify.verify(senderPublicKey, Buffer.from(signatureForMessage, 'base64'));
    }
}