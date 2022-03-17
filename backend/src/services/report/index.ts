import { PrismaClient, Customers } from "@prisma/client"
import prismaClient from "../orm"
export class ReportService {
    constructor(
        private readonly prisma: PrismaClient = prismaClient,
    ){}

    async mountCustomersReport(userId: string): Promise<{totalCustomers: number, lastCustomers: any}> {
        const allCustomers = await this.findAllCustomers(userId)

        const customerLastRegister = await this.findCustomerLastRegister(userId)
        
        if(customerLastRegister.length <= 0) {
            return {
                totalCustomers: allCustomers.length, 
                lastCustomers: "Não existem clientes registrados."
            }
        }

        return {
            totalCustomers: allCustomers.length, 
            lastCustomers: customerLastRegister
        }
    }

    private async findAllCustomers(userId: string): Promise<{email: string}[]>{
        return await this.prisma.customers.findMany({
            where: {
                userId: userId
            },
            select: {
                email: true
            }
        })
    }

    private async findCustomerLastRegister(userId: string): Promise<Customers[]> {
        return await this.prisma.customers.findMany({
            take: 1,
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }
}