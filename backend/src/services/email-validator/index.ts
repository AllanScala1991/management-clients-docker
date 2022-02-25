import { validate } from "email-validator"

export class Email {
    
    async validate(email: string): Promise<boolean> {
        return await validate(email)
    }
}