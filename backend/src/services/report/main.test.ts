import { ReportService } from "."
import { CustomerService } from "../customer"

let customerId: string

describe("Report Service", () => {
    beforeAll(async () => {
        const customer = await new CustomerService().createCustomer({
            name: "any name",
            birthDate: "10/01/2022",
            zipCode: "88888888",
            city: "any city",
            district: "any district",
            address: "any address",
            addressNumber: 99,
            state: "any state",
            phone: "999999999",
            email: "anymail@mail.com",
            userId: "1"
        })
        expect(customer).not.toBeNull
        customerId = customer.id
    })

    test("Should validate mount report with exist customer", async () => {
        const report = await new ReportService().mountCustomersReport("1")

        expect(report.totalCustomers).toBeGreaterThan(0)
        expect(report.lastCustomers.length).toBeGreaterThan(0)

    })

    test("Should validate mount report invalid customer", async () => {
        const report = await new ReportService().mountCustomersReport("invalid id")

        expect(report.totalCustomers).toEqual(0)
        expect(report.lastCustomers).toEqual("Não existem clientes registrados.")
    })

    afterAll(async () => {
        const deleteCustomer = await new CustomerService().deleteCustomer(customerId)

        expect(deleteCustomer).not.toBeNull
    })
})