import { ReportController } from "."
import { CustomerService } from "../../services/customer"

let customerId: string

describe("Report Controller", () => {
    beforeAll(async () => {
        const createCustomer = await new CustomerService().createCustomer({
            name: "Any Name",
            birthDate: "10/10/2010",
            zipCode: "83701300",
            city: "Any City",
            district: "Any District",
            address: "Any Address",
            addressNumber: 22,
            state: "PR",
            phone: "999999999",
            email: "any_mail@mail.com",
            userId: "1"
        })

        customerId = createCustomer.id
    })

    it("Should validate customer report successfully", async () => {
        const mountCustomerReport = await new ReportController().mountCustomersReport('1')

        expect(mountCustomerReport.data).toHaveProperty('totalCustomers')
        expect(mountCustomerReport.data).toHaveProperty('lastCustomers')
        expect(mountCustomerReport.data?.totalCustomers).toBeGreaterThan(0)
    })

    it("Should validate customer report with invalid user ID", async () => {
        const customerReportWithInvalidID = await new ReportController().mountCustomersReport('invalid_ID')

        expect(customerReportWithInvalidID).toHaveProperty('data')
        expect(customerReportWithInvalidID.data?.lastCustomers).toEqual('Não existem clientes registrados.')
    })

    it("Should validate customer report with empty ID", async () => {
        const customerReportWithEmptyID = await new ReportController().mountCustomersReport('')

        expect(customerReportWithEmptyID).toHaveProperty('message')
        expect(customerReportWithEmptyID.message).toEqual('ID do usuário inválido, efetue um novo login.')
    })

    afterAll(async () => {
        const deleteCustomer = await new CustomerService().deleteCustomer(customerId)
    })
})