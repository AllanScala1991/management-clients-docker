import { UserService } from "../user"
import { sign, verify } from "jsonwebtoken"
import "dotenv/config"
import { EncrypterService } from "../encrypter"

export class LoginService {
    constructor(
        private readonly secretToken = `${process.env.SECRET_TOKEN}`
    ){}

    async login(username: string, password: string): Promise<any> {
        const userExists = await new UserService().findUserByUsername(username)

        if(userExists.length <= 0) {
            return {status: false}
        }

        const isValidPassword = await new EncrypterService().compare(password, userExists[0].password)

        if(!isValidPassword) {
            return {status: false}
        }

        const tokenGenerate = sign({
            user: userExists[0].username,
            id: userExists[0].id
        },
        this.secretToken,
        {
            expiresIn: "1d"
        })

        const decode = verify(tokenGenerate, this.secretToken)

        return {status: true, token: tokenGenerate, decode: decode}

    } 
}