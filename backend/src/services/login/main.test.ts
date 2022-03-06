import { LoginService } from "."
import "dotenv/config"


describe("Login Service", () => {
    it("Should validate login method", async () => {
        const login = await new LoginService().login(
            `${process.env.USERNAME}`,
            `${process.env.PASSWORD}`
        )

        expect(login.status).toBeTruthy
        expect(login.token.length).toBeGreaterThan(0)
    })

    it("Should validate login with invalid username", async () => {
        const login = await new LoginService().login(
            "invalid username",
            `${process.env.PASSWORD}`
        )

        expect(login.status).toBeFalsy
        expect(login).not.toHaveProperty
    })

    it("Should validate login with invalid password", async() => {
        const login = await new LoginService().login(
            `${process.env.USERNAME}`,
            "invalid_password"
        )

        expect(login.status).toBeFalsy
        expect(login).not.toHaveProperty
    })

    
})