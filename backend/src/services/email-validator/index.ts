import { validate } from "email-validator"

export class EmailService {
    
    async validate(email: string): Promise<boolean> {
        return await validate(email)
    }
}