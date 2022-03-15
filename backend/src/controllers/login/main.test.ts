import { LoginController } from "."


describe("Login Controller", () => {
    it("Should validate login successfully", async () => {
        const userLogin = await new LoginController().login("admin", "admin")

        expect(userLogin).toHaveProperty('token')
        expect(userLogin).toHaveProperty('status')
        expect(userLogin.token).not.toBeNull
        expect(userLogin.status).toBeTruthy
    })

    it("Should validate login with empty username and password", async () => {
        const loginWithEmptyValues = await new LoginController().login('', '')

        expect(loginWithEmptyValues).toHaveProperty('message')
        expect(loginWithEmptyValues).toHaveProperty('status')
        expect(loginWithEmptyValues.message).toEqual('Usuário ou Senha estão incorretos.')
        expect(loginWithEmptyValues.status).toBeFalsy
    })

    it("Should validate with incorrect password", async () => {
        const loginWithIncorrectPassword =  await new LoginController().login('admin', '123')

        expect(loginWithIncorrectPassword).toHaveProperty('message')
        expect(loginWithIncorrectPassword).toHaveProperty('status')
        expect(loginWithIncorrectPassword.message).toEqual('Usuário ou Senha estão incorretos.')
        expect(loginWithIncorrectPassword.status).toBeFalsy
    })
})