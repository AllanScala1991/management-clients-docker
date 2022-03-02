import { ICustomer } from "../../interfaces/customer";
import { CustomerService } from "../../services/customer";
import { EmailService } from "../../services/email-validator";

export class CustomerController {

    async createCustomer(customer: ICustomer) {
        try {
            const isEmpty = await Promise.all(Object.values(customer).filter((value) => {return value == ""}))
    
            if(isEmpty.length > 0) return {message: "Todos os campos devem ser preenchidos.", status: false}
    
            const emailValidator = await new EmailService().validate(customer.email)
    
            if(!emailValidator) {
                return {message: "Email inválido, tente novamente.", status: false}
            }
    
            const customerExists = await new CustomerService().findCustomer(customer.userId, customer.name)
    
            if(customerExists.length > 0) {
                return {message: "Já existe um cliente registrado com esses dados.", status: false}
            }
    
            const customerCreate = await new CustomerService().createCustomer(customer)
    
            if(!customerCreate) {
                return {message: "Erro ao registrar um cliente, tente novamente.", status: false}
            }
    
            return {message: "Cliente registrado com sucesso.", data: customerCreate, status: true}
            
        } catch (error) {
            return {message: "Erro ao registrar um cliente, contate o administrador.", status: false}
        }
    }

    async findCustomer(userId: string, name?: string) {
        try {
            if(!userId) return {message: "Você foi deslogado, acesse a plataforma novamente.", status: false}
    
            if(name) {
                const findCustomerByName = await new CustomerService().findCustomer(userId, name)
    
                if(findCustomerByName.length <= 0) {
                    return {message: "Nenhum cliente foi localizado.", status: false}
                }
    
                return {data: findCustomerByName, status: true}
            }
    
            const findAllCustomer = await new CustomerService().findCustomer(userId)
    
            if(findAllCustomer.length <= 0) {
                return {message: "Nenhum cliente foi localizado.", status: false}
            }
    
            return {data: findAllCustomer, status: true}
            
        } catch (error) {
            return {message: "Erro ao localizar um cliente, contate o administrador.", status: false}
        }
    }

    async updateCustomer(customerId: string, customer: ICustomer) {
        try {
            const isEmpty = await Promise.all(Object.values(customer).filter((value) => {return value == ""}))
    
            if(isEmpty.length > 0 || !customerId) return {message: "Todos os campos devem ser preenchidos."}
    
            const emailValidator = await new EmailService().validate(customer.email)
    
            if(!emailValidator) {
                return {message: "Email inválido, tente novamente.", status: false}
            }
    
            const customerUpdate = await new CustomerService().updateCustomer(customer, customerId)
    
            if(!customerUpdate) {
                return {message: "Não foi possivel atualizar o cliente, tente novamente.", status: false}
            }
    
            return {message: "Cliente atualizado com sucesso.", status: true}
            
        } catch (error) {
            return {message: "Erro ao atualizar um cliente, contate o administrador.", status: false}
        }
    }

    async deleteCustomer(customerId: string) {
        try {
            if(!customerId) return {message: "Nenhum cliente foi localizado", status: false}
    
            const customerDelete = await new CustomerService().deleteCustomer(customerId)
            if(customerDelete) return {message: "Não foi possivel deletar o cliente, tente novamente.", status: false}
    
            return {message: "Cliente deletado com sucesso.", status: true}
            
        } catch (error) {
            return {message: "Erro ao deletar o cliente, contate o administrador.", status: false}
        }
    }
}