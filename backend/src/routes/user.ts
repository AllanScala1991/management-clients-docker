import { Router, Request, Response } from "express"

const app = Router()

app.get("/", async (req: Request, res: Response) => {
    return res.send("Hello Node API")
})

export default app