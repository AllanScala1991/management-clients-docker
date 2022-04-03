import { ICustomer } from "../../interfaces/customer";
import { PrismaClient, Prisma, PrismaPromise, Customers } from "@prisma/client";
import prismaClient from "../orm"

export class CustomerService {

    constructor(
        private readonly prisma:PrismaClient = prismaClient
    ){}

    async createCustomer(customer: ICustomer): 
    Promise<Prisma.Prisma__CustomersClient<any>>{
        return await this.prisma.customers.create({
            data: {
                name: customer.name,
                birthDate: customer.birthDate,
                zipCode: customer.zipCode,
                city: customer.city,
                district: customer.district,
                address: customer.address,
                addressNumber: customer.addressNumber,
                state: customer.state,
                phone: customer.phone,
                email: customer.email,
                userId: customer.userId
            }
        })
    }

    async findCustomer(userId: string, name?: string): 
    Promise<PrismaPromise<Customers[]>>{
        if(name) {
            return await this.prisma.customers.findMany({
                where: {
                    name: name,
                    userId: userId
                }
            })
        }

        return await this.prisma.customers.findMany({
            where: {
                userId: userId
            }
        })
    }

    async findCustomerWithID(customerId: string, userId: string):
    Promise<PrismaPromise<Customers[]>>{
        return await this.prisma.customers.findMany({
            where: {
                id: customerId,
                userId: userId
            }
        })
    }
    
    async updateCustomer(customer: ICustomer, id: string): 
    Promise<Prisma.Prisma__CustomersClient<any>>{
        return this.prisma.customers.update({
            data: {
                name: customer.name,
                birthDate: customer.birthDate,
                zipCode: customer.zipCode,
                city: customer.city,
                district: customer.district,
                address: customer.address,
                addressNumber: customer.addressNumber,
                state: customer.state,
                phone: customer.phone,
                email: customer.email            
            },
            where: {
                id: id
            }
        })
    }

    async deleteCustomer(id: string): 
    Promise<Prisma.Prisma__CustomersClient<Customers>>{
        return await this.prisma.customers.delete({
            where: {
                id: id
            }
        })
    }
}