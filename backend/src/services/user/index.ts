import { PrismaClient, Prisma, User } from "@prisma/client";
import { IUser } from "../../interfaces/user";

export class UserService {
    constructor(private readonly prisma = new PrismaClient()){}

    async createUser(user: IUser): 
    Promise<Prisma.Prisma__UserClient<User>> {
        return await this.prisma.user.create({
            data: {
                username: user.username,
                password: user.password,
                email: user.email
            }
        })
    }
}