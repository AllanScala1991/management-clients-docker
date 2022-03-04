import { PrismaClient, Customers } from "@prisma/client"
export class ReportService {
    constructor(
        private readonly prisma: PrismaClient = new PrismaClient(),
    ){}

    async mountCustomersReport(userId: string): Promise<{}> {
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
            take: 3,
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }
}