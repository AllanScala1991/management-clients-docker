import { UserService } from "../../services/user";
import { IUser } from "../../interfaces/user";
import { EmailService } from "../../services/email-validator";
import { EncrypterService } from "../../services/encrypter";

export class UserController {
    constructor(
        private readonly serviceUser = new UserService(),
        private readonly emailValidator = new EmailService(),
        private readonly encryptor = new EncrypterService()
    ){}

    async createUser(user: IUser) {
        try {
            if(!user.username || !user.password || !user.email) {
                return {message: "Todos os campos devem ser preenchidos.", status: false}
            }
    
            const userExists = await this.serviceUser.findUserByUsername(user.username)
    
            if(userExists.length > 0) {
                return {message: "Já existe um usuário com essas informações.", status: false}
            }
    
            const isValidEmail = await this.emailValidator.validate(user.email)
    
            if(!isValidEmail) return {message: "E-mail inválido, tente novamente.", status: false}
    
            const passwordHashed = await this.encryptor.hash(user.password, 8)
    
            const userCreate = await this.serviceUser.createUser({
                username: user.username,
                password: passwordHashed,
                email: user.email
            })
    
            if(!userCreate) {
                return {message: "Erro ao registrar um novo usuário, tente novamente.", status: false}
            }
    
            return {message: "Usuário registrado com sucesso.", data: userCreate, status: true}
            
        } catch (error) {
            return {message: "Erro ao registrar um usuário, contate o administrador.", status: false}
        }
    }

    async findUserById(id: string) {
        try {
            if (!id) return {message: "Usuário não localizado.", status: false}
    
            const findUser = await this.serviceUser.findUserById(id)
    
            if(!findUser) return {message: "Usuário não localizado.", status: false}
    
            return {data: findUser, status: true}
            
        } catch (error) {
            return {message: "Erro ao localizar um usuário, contate o administrador.", status: false}
        }
    }

    async findUserByUsername(username: string) {
        try {
            if (!username) return {message: "Usuário não localizado.", status: false}
    
            const findUser = await this.serviceUser.findUserByUsername(username)
    
            if(findUser.length <= 0) return {message: "Nenhum usuário localizado.", status: false}
    
            return {data: findUser, status: true}
            
        } catch (error) {
            return {message: "Erro ao localizar um usuário, contate o administrador.", status: false}
        }
    }

    async updateUser(username: string, email:string, id: string) {
        try {
            if(!username || !email) {
                return {message: "Todos os campos devem ser preenchidos.", status: false}
            }
            if(!id) return {message: "Usuário não localizado.", status: false}
    
            const isValidEmail = await this.emailValidator.validate(email)
    
            if(!isValidEmail) return {message: "E-mail inválido, tente novamente.", status: false}
    
            const userUpdate = await this.serviceUser.updateUser(username, email, id)
    
            if(!userUpdate) return {message: "Erro ao atualizar o usuário.", status: false}
    
            return {message: "Usuário atualizado com sucesso.", status: true}
            
        } catch (error) {
            return {message: "Erro ao atualizar um usuário, contate o administrador.", status: false}
        }

    }

    async deleteUser(id: string) {
        try {
            if(!id) return {message: "Usuário não localizado.", status: false}
    
            const userDelete = await this.serviceUser.deleteUser(id)
    
            if(!userDelete) return {message: "Erro ao deletar usuário.", status: false}
    
            return {message: "Usuário deletado com sucesso.", status: true}
            
        } catch (error) {
            return {message: "Erro ao deletar um usuário, contate o administrador.", status: false}
        }
    }
}