import express, { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

const app = express()

app.use(function(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization

    if(!authorization) {
        return res.send({message: "Usuário não autorizado."})
    }

    const token = authorization.split(" ")

    try {
        verify(token[1], `${process.env.SECRET_TOKEN}`)
        return next()
    } catch (error) {
        return res.send({message: "Sua sessão expirou, faça o login novamente."})
    }
})

export default app

/* export class Authenticated {

    async authenticate(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization

        if(!authorization) {
            return res.send({message: "Usuário não autorizado."})
        }

        const token = authorization.split(" ")

        try {
            verify(token[1], `${process.env.SECRET_TOKEN}`)
            return next()
        } catch (error) {
            return res.send({message: "Sua sessão expirou, faça o login novamente."})
        }
    }
} */