import { Router, Request, Response } from "express";
import { LoginController } from "controllers/login";

const app = Router()

app.post("/login", async (req: Request, res: Response) => {
    const {username, password} = req.body

    const userToken = await new LoginController().login(username, password)

    res.send(userToken)
})

module.exports = app