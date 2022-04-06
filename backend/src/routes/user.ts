import { Router, Request, Response } from "express"
import { UserController } from "../controllers/user"
import auth from "../middlewares/authenticated"

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

app.get("/user/id/:id", auth, async (req: Request, res: Response) => {
    const id = req.params.id

    const getUserById = await new UserController().findUserById(id)

    return res.send(getUserById)
})

app.get("/user/username/:username", auth, async (req: Request, res: Response) => {
    const username = req.params.username

    const findUser = await new UserController().findUserByUsername(username)

    res.send(findUser)
})

app.patch("/user", auth, async (req: Request, res: Response) => {
    const {id, username, email} = req.body

    const updateUser = await new UserController().updateUser(
        username,
        email,
        id
    )

    return res.send(updateUser)
})

app.delete("/user/:id", auth, async (req: Request, res: Response) => {
    const id = req.params.id

    const deleteUser = await new UserController().deleteUser(id)

    return res.send(deleteUser)
})

app.get("/", (req: Request, res: Response) => {
    res.send("API RODANDO VIA DOCKER")
})

module.exports = app