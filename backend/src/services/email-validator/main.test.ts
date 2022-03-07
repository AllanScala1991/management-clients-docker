import { EmailService } from "."

describe("Email Validator Service", () => {

    it("Should validate email correct", async () => {
        const email = await new EmailService().validate("anymail@mail.com")

        expect(email).toBeTruthy
    })

    it("Should validate email without @", async () => {
        const emailInvalid = await new EmailService().validate("invalid_email.com")

        expect(emailInvalid).toBeFalsy
    })

    it("Should validate email without .com", async () => {
        const emailInvalid = await new EmailService().validate("invalid_email@.br")

        expect(emailInvalid).toBeFalsy
    })
})