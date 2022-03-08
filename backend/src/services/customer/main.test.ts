import { CustomerService } from "."

let customerId: string

describe("Customer Service", () => {

    test("Should validate create customer successfully", async () => {
        const customer = await new CustomerService().createCustomer({
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

        expect(customer).not.toBeNull
        expect(customer).toHaveProperty("id")

        customerId = customer.id
    })

    test("Should validate find customer with name", async () => {
        const findCustomerWithName = await new CustomerService().findCustomer("1", "Any Name")

        expect(findCustomerWithName).not.toBeNull
        expect(findCustomerWithName[0].email).toEqual("any_mail@mail.com")
    })

    test("Should validate find customer without name", async () => {
        const findCustomerWithoutName = await new CustomerService().findCustomer("1")

        expect(findCustomerWithoutName).not.toBeNull
        expect(findCustomerWithoutName[0].name).toEqual("Any Name")
    })

    test("Should validate update customer", async () => {
        const updateCustomer = await new CustomerService().updateCustomer({
            name: "Update Name",
            birthDate: "10/10/2010",
            zipCode: "83701300",
            city: "Araucaria",
            district: "Iguacu",
            address: "Rua Alagoas",
            addressNumber: 22,
            state: "PR",
            phone: "999999999",
            email: "any_mail@mail.com",
            userId: "1"
        }, customerId)

        expect(updateCustomer).not.toBeNull
        expect(updateCustomer.name).toEqual("Update Name")
        expect(updateCustomer.id).toEqual(customerId)
    })

    test("Should validate delete customer", async () => {
        const deleteCustomer = await new CustomerService().deleteCustomer(customerId)

        expect(deleteCustomer).not.toBeNull
        expect(deleteCustomer.id).toEqual(customerId)
    })
})