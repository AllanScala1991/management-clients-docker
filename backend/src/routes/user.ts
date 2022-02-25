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

app.get("/user/id/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    const getUserById = await new UserController().findUserById(id)

    return res.send(getUserById)
})

app.get("/user/username/:username", async (req: Request, res: Response) => {
    const username = req.params.username

    const findUser = await new UserController().findUserByUsername(username)

    res.send(findUser)
})

app.patch("/user", async (req: Request, res: Response) => {
    const {id, username, password, email} = req.body

    const updateUser = await new UserController().updateUser({
        username,
        password,
        email
    }, id)

    return res.send(updateUser)
})

app.delete("/user/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    const deleteUser = await new UserController().deleteUser(id)

    return res.send(deleteUser)
})

export default app