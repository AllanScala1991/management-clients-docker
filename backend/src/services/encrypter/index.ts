import { hash, compare } from "bcryptjs"

export class EncrypterService {
    async hash(value: string, salt: number) {
        return await hash(value, salt)
    }

    async compare(currentValue: string, hashValue: string) {
        return await compare(currentValue, hashValue)
    }
}