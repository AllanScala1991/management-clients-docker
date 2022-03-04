import { CepController } from "../controllers/cep";
import { Router, Request, Response } from "express";

const app = Router()


app.get("/cep/:getCep", async(req: Request, res: Response) => {
    const cep = req.params.getCep

    const findCep = await new CepController().findCep(cep)

    res.send(findCep)
})

module.exports = app