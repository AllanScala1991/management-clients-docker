import { Router, Request, Response } from "express";
import { CustomerController } from "../controllers/customer";
import auth from "../middlewares/authenticated"

const app = Router()

app.post("/customer", auth, async (req: Request, res: Response) => {
    const { name, birthDate, zipCode, city, district, address, 
        addressNumber, state, phone, email, userId} = req.body

    const createCustomer = await new CustomerController().createCustomer({ name, birthDate, zipCode, city, district, address, 
        addressNumber, state, phone, email, userId})
    
    res.send(createCustomer)
})

app.get("/customer/:userId/:name?", auth, async (req: Request, res: Response) => {
    const {userId, name} = req.params

    const getCustomer = await new CustomerController().findCustomer(userId, name)

    res.send(getCustomer)
})

app.get("/customer/id/:userId/:customerId", auth, async (req: Request, res: Response) => {
    const {userId, customerId} = req.params

    const getCustomer = await new CustomerController().findCustomerWithID(customerId, userId)

    res.send(getCustomer)
})

app.patch("/customer", auth, async (req: Request, res: Response) => {
    const {customerId, name, birthDate, zipCode, city, district, address, 
        addressNumber, state, phone, email, userId} = req.body

    const customerUpdate = await new CustomerController().updateCustomer(customerId, {name, birthDate, zipCode, city, district, address, 
        addressNumber, state, phone, email, userId})

    res.send(customerUpdate)
})

app.delete("/customer/:id", auth, async (req: Request, res: Response) => {
    const customerId = req.params.id

    const deleteCustomer = await new CustomerController().deleteCustomer(customerId)

    res.send(deleteCustomer)
})

module.exports = app