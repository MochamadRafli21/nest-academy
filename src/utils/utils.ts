import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { createDecipheriv } from 'crypto';

export class utilsService {
    constructor(
        private readonly iv = randomBytes(16),
    ) {}

   async encrypt(text:string):Promise<string> {
    // todo generate key from os

    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const key = (await promisify(scrypt)(process.env.PASSWORD, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, this.iv);

    const encryptedText = Buffer.concat([
    cipher.update(text),
    cipher.final(),
    ]);

    return encryptedText.toString()
   }

   async decrypt(encryptedText:string):Promise<string>{
    const encryptedBuffer =Buffer.from(encryptedText, 'utf8')
    const key = (await promisify(scrypt)(process.env.PASSWORD, 'salt', 32)) as Buffer;

    const decipher = createDecipheriv('aes-256-ctr', key, this.iv);
    const decryptedText = Buffer.concat([
    decipher.update(encryptedBuffer),
    decipher.final(),
    ]);
    return decryptedText.toString()

   }

}