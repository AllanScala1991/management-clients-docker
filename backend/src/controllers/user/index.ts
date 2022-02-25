import { UserService } from "../../services/user";
import { IUser } from "../../interfaces/user";
import { Email } from "../../services/email-validator";

export class UserController {
    constructor(
        private readonly serviceUser = new UserService(),
        private readonly emailValidator = new Email()
    ){}

    async createUser(user: IUser) {
        if(!user.username || !user.password || !user.email) {
            return {message: "Todos os campos devem ser preenchidos."}
        }

        const userExists = await this.serviceUser.finUserByUsername(user.username)

        if(userExists.length > 0) {
            return {message: "Já existe um usuário com essas informações."}
        }

        const isValidEmail = await this.emailValidator.validate(user.email)

        if(!isValidEmail) return {message: "E-mail inválido, tente novamente."}

        const userCreate = await this.serviceUser.createUser(user)

        if(!userCreate) {
            return {message: "Erro ao registrar um novo usuário, tente novamente."}
        }

        return {message: "Usuário registrado com sucesso."}
    }

    async findUserById(id: number) {
        if (!id) return {message: "Usuário não localizado.", status: false}

        const findUser = await this.serviceUser.findUserById(id)

        if(!findUser) return {message: "Usuário não localizado.", status: false}

        return {data: findUser, status: true}
    }

    async updateUser(user: IUser, id: number) {
        if(!user.username || !user.password || !user.email) {
            return {message: "Todos os campos devem ser preenchidos."}
        }

        if(!id) return {message: "Usuário não localizado."}

        const isValidEmail = await this.emailValidator.validate(user.email)

        if(!isValidEmail) return {message: "E-mail inválido, tente novamente."}

        const userUpdate = await this.serviceUser.updateUser(user, id)

        if(!userUpdate) return {message: "Erro ao atualizar o usuário."}

        return {message: "Usuário atualizado com sucesso."}
    }

    async deleteUser(id: number) {
        if(!id) return {message: "Usuário não localizado."}

        const userDelete = await this.serviceUser.deleteUser(id)

        if(!userDelete) return {message: "Erro ao deletar usuário."}

        return {message: "Usuário deletado com sucesso."}
    }
}