import { CustomerController } from "."

let customerId: string

describe("Customer Controller", () => {
    it("Should validate create customer successfully", async () => {
        const createUser = await new CustomerController().createCustomer({
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

        expect(createUser).toHaveProperty('message')
        expect(createUser).toHaveProperty('data')
        expect(createUser).toHaveProperty('status')
        expect(createUser.message).toEqual('Cliente registrado com sucesso.')
        expect(createUser.status).toBeTruthy
        expect(createUser.data).toHaveProperty('name')

        customerId = createUser.data.id

    })

    it("Should validate create customer with empty value", async () => {
        const createUserWithEmptyValue = await new CustomerController().createCustomer({
            name: "",
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

        expect(createUserWithEmptyValue).toHaveProperty('message')
        expect(createUserWithEmptyValue).toHaveProperty('status')
        expect(createUserWithEmptyValue.message).toEqual('Todos os campos devem ser preenchidos.')
        expect(createUserWithEmptyValue.status).toBeFalsy
    })

    it("Should validate create customer with invalid email", async () => {
        const createUserWithInvalidEmail = await new CustomerController().createCustomer({
            name: "any name",
            birthDate: "10/10/2010",
            zipCode: "83701300",
            city: "Any City",
            district: "Any District",
            address: "Any Address",
            addressNumber: 22,
            state: "PR",
            phone: "999999999",
            email: "invalidemail.com",
            userId: "1"
        })

        expect(createUserWithInvalidEmail).toHaveProperty('message')
        expect(createUserWithInvalidEmail).toHaveProperty('status')
        expect(createUserWithInvalidEmail.message).toEqual('Email inválido, tente novamente.')
        expect(createUserWithInvalidEmail.status).toBeFalsy
    })

    it("Should validate create repeat customer", async () => {
        const createRepeatCustomer = await new CustomerController().createCustomer({
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

        expect(createRepeatCustomer).toHaveProperty('message')
        expect(createRepeatCustomer).toHaveProperty('status')
        expect(createRepeatCustomer.message).toEqual('Já existe um cliente registrado com esses dados.')
        expect(createRepeatCustomer.status).toBeFalsy
    })

    it("Should validate find customer with user id successfully", async () => {
        const findCustomerWithUserID = await new CustomerController().findCustomer('1')

        expect(findCustomerWithUserID).toHaveProperty('data')
        expect(findCustomerWithUserID).toHaveProperty('status')
        expect(findCustomerWithUserID.data?.length).toBeGreaterThan(0)
        expect(findCustomerWithUserID.status).toBeTruthy
    })

    it("Should validate find customer with name successfully", async () => {
        const findCustomerWithName = await new CustomerController().findCustomer('1','Any Name')

        expect(findCustomerWithName).toHaveProperty('data')
        expect(findCustomerWithName).toHaveProperty('status')
        expect(findCustomerWithName.data?.length).toBeGreaterThan(0)
        expect(findCustomerWithName.status).toBeTruthy
    })

    it("Should validate find customer with empty user ID", async () => {
        const findCustomerWithEmptyUserID = await new CustomerController().findCustomer('')

        expect(findCustomerWithEmptyUserID).toHaveProperty('message')
        expect(findCustomerWithEmptyUserID).toHaveProperty('status')
        expect(findCustomerWithEmptyUserID.message).toEqual('Você foi deslogado, acesse a plataforma novamente.')
        expect(findCustomerWithEmptyUserID.status).toBeFalsy
    })

    it("Should validate find customer with non existent name", async () => {
        const findCustomerWithNoExistentName = await new CustomerController().findCustomer('1', 'invalid name')

        expect(findCustomerWithNoExistentName).toHaveProperty('message')
        expect(findCustomerWithNoExistentName).toHaveProperty('status')
        expect(findCustomerWithNoExistentName.message).toEqual('Nenhum cliente foi localizado.')
        expect(findCustomerWithNoExistentName.status).toBeFalsy
    })

    it("Should validate find customer with invalid user ID", async () => {
        const findCustomerWithInvalidUserID = await new CustomerController().findCustomer('')

        expect(findCustomerWithInvalidUserID).toHaveProperty('message')
        expect(findCustomerWithInvalidUserID).toHaveProperty('status')
        expect(findCustomerWithInvalidUserID.message).toEqual('Você foi deslogado, acesse a plataforma novamente.')
        expect(findCustomerWithInvalidUserID.status).toBeFalsy
    })

    it("Should validate update customer successfully", async () => {
        const updateCustomer = await new CustomerController().updateCustomer(customerId, {
            name: "Update Name",
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

        expect(updateCustomer).toHaveProperty('message')
        expect(updateCustomer).toHaveProperty('status')
        expect(updateCustomer.message).toEqual('Cliente atualizado com sucesso.')
        expect(updateCustomer.status).toBeTruthy

    })

    it("Should validate update customer with empty value", async () => {
        const updateCustomerWithEmptyValue = await new CustomerController().updateCustomer(customerId, {
            name: "",
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

        expect(updateCustomerWithEmptyValue).toHaveProperty('message')
        expect(updateCustomerWithEmptyValue.message).toEqual('Todos os campos devem ser preenchidos.')
    })

    it("Should validate update customer with invalid email", async () => {
        const updateCustomerWithInvalidEmail = await new CustomerController().updateCustomer(customerId, {
            name: "Update Name",
            birthDate: "10/10/2010",
            zipCode: "83701300",
            city: "Any City",
            district: "Any District",
            address: "Any Address",
            addressNumber: 22,
            state: "PR",
            phone: "999999999",
            email: "invalidemail.com",
            userId: "1"
        })

        expect(updateCustomerWithInvalidEmail).toHaveProperty('message')
        expect(updateCustomerWithInvalidEmail).toHaveProperty('status')
        expect(updateCustomerWithInvalidEmail.message).toEqual('Email inválido, tente novamente.')
        expect(updateCustomerWithInvalidEmail.status).toBeFalsy
    })

    it("Should validate delete customer with invalid ID", async () => {
        const deleteCustomerWithInvalidID = await new CustomerController().deleteCustomer('invalid_id')

        expect(deleteCustomerWithInvalidID).toHaveProperty('message')
        expect(deleteCustomerWithInvalidID).toHaveProperty('status')
        expect(deleteCustomerWithInvalidID.message).toEqual('Erro ao deletar o cliente, contate o administrador.')
        expect(deleteCustomerWithInvalidID.status).toBeFalsy
    })

    it("Should validate delete customer with empty ID", async () => {
        const deleteCustomerWithEmptyID = await new CustomerController().deleteCustomer('')

        expect(deleteCustomerWithEmptyID).toHaveProperty('message')
        expect(deleteCustomerWithEmptyID).toHaveProperty('status')
        expect(deleteCustomerWithEmptyID.message).toEqual('Nenhum cliente foi localizado')
        expect(deleteCustomerWithEmptyID.status).toBeFalsy
    }) 

    it("Should validate delete customer successfully", async () => {
        const deleteCustomer = await new CustomerController().deleteCustomer(customerId)

        expect(deleteCustomer).toHaveProperty('message')
        expect(deleteCustomer).toHaveProperty('status')
        expect(deleteCustomer.message).toEqual('Cliente deletado com sucesso.')
        expect(deleteCustomer.status).toBeTruthy
    })
})