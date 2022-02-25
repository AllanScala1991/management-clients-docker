import { UserService } from "../../services/user";
import { IUser } from "../../interfaces/user";

export class UserController {
    constructor(
        private readonly serviceUser = new UserService()
    ){}

    async createUser(user: IUser) {
        if(!user.username || !user.password || !user.email) {
            return {message: "Todos os campos devem ser preenchidos."}
        }

        const userCreate = await this.serviceUser.createUser(user)

        if(!userCreate) {
            return {message: "Erro ao registrar um novo usuário, tente novamente."}
        }

        return {message: "Usuário registrado com sucesso."}
    }
}