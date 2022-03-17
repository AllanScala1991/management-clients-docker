import { Prisma, User, PrismaPromise, PrismaClient } from "@prisma/client";
import { IUser } from "../../interfaces/user";
import prismaClient from "../orm"

export class UserService {
    constructor(private readonly prisma: PrismaClient = prismaClient){}

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

    async findUserById(id: string): 
    Promise<Prisma.Prisma__UserClient<User[]>> {
        return await this.prisma.user.findMany({
            where: {
                id: id
            }
        })
    }

    async findUserByUsername(username: string):
    Promise<PrismaPromise<User[]>> {
        return await this.prisma.user.findMany({
            where: {
                username: username
            }
        })
    }

    async updateUser(user: IUser, id: string): 
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

    async deleteUser(id: string): 
    Promise<Prisma.Prisma__UserClient<User>>{
        return await this.prisma.user.delete({
            where: {
                id: id
            }
        })
    }
}