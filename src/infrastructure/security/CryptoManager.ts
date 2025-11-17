import { 
  createCipheriv, 
  createDecipheriv, 
  scryptSync, 
  randomBytes 
} from 'crypto';

export class CryptoManager {

    private static ALGORITHM = 'aes-256-gcm';
    private static KEY_LENGTH_BYTES = 32; 
    private static IV_LENGTH_BYTES = 12; 
    private static SALT_LENGTH_BYTES = 16;

    public static encrypt(message: string) {

        const salt = randomBytes(this.SALT_LENGTH_BYTES);

        // @ts-ignore
        const key = scryptSync(process.env.SECRET, salt, this.KEY_LENGTH_BYTES);

        const iv = randomBytes(this.IV_LENGTH_BYTES);

        // @ts-ignore
        const cipher = createCipheriv(this.ALGORITHM, key, iv);

        let encrypted = cipher.update(message, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const authTag = cipher.getAuthTag().toString('hex');

        return `${salt.toString('hex')}:${iv.toString('hex')}:${authTag}:${encrypted}`;

    }

    public static decrypt(encryptedMessage: string) {
            
        const parts = encryptedMessage.split(':');
        
        const [saltHex, ivHex, authTagHex, ciphertextHex] = parts;

        const salt = Buffer.from(saltHex, 'hex');
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');

        // @ts-ignore
        const key = scryptSync(process.env.SECRET, salt, this.KEY_LENGTH_BYTES);

        // @ts-ignore
        const decipher = createDecipheriv(this.ALGORITHM, key, iv);

        // @ts-ignore
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(ciphertextHex, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;

    }

}