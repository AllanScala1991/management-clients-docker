import { PrismaClient, Prisma, User, PrismaPromise } from "@prisma/client";
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

    async findUserById(id: number): 
    Promise<Prisma.Prisma__UserClient<User | null>> {
        return await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })
    }

    async finUserByUsername(username: string):
    Promise<PrismaPromise<User[]>> {
        return await this.prisma.user.findMany({
            where: {
                username: username
            }
        })
    }

    async updateUser(user: IUser, id: number): 
    Promise<Prisma.Prisma__UserClient<User>>{
        return await this.prisma.user.update({
            data: {
                username: user.username,
                password: user.password,
                email: user.email
            },
            where: {
                id: id
            }
        })
    }

    async deleteUser(id: number): 
    Promise<Prisma.Prisma__UserClient<User>>{
        return await this.prisma.user.delete({
            where: {
                id: id
            }
        })
    }
}