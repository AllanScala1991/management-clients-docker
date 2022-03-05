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
})