import { hash } from "bcryptjs"

export class Encrypter {
    async hash(value: string, salt: number) {
        return await hash(value, salt)
    }
}