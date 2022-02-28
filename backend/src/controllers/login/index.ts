import { LoginService } from "../../services/login"

export class LoginController {

    async login(username: string, password: string) {
        if(!username || !password) {
            return {message: "Usuário ou Senha estão incorretos.", status: false}
        }

        const userExists = await new LoginService().login(username, password)

        if(!userExists.status) {
            return {message: "Usuário ou Senha estão incorretos.", status: false}
        }

        return {token: userExists.token, status: true}
    }
}