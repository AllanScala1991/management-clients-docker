import { hash } from "bcryptjs"
import { EncrypterService } from "."

let passwordHashed: string

describe("Encrypter Service", () => {

    test("Should validate encrypter hash", async () => {
        const hash = await new EncrypterService().hash("123", 8)

        expect(hash.length).toBeGreaterThan(3)
        expect(hash).not.toEqual("123")

        passwordHashed = hash
    })

    test("Should validate encrypter compare", async () => {
        const compare = await new EncrypterService().compare("123", passwordHashed)

        expect(compare).toBeTruthy
    })
})