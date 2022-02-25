import { Router, Request, Response } from "express"
import { UserController } from "../controllers/user"

const app = Router()

app.post("/user", async (req: Request, res: Response) => {
    const {username, password, email} = req.body

    const createUser = await new UserController().createUser({
        username,
        password, 
        email
    })

    return res.send(createUser)
})

export default app