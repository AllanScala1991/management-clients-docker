import express, { Express } from "express";
import { IServer } from "../../interfaces/server";

export class ExpressAdapter implements IServer {

    constructor(
        private readonly app: Express = express()
    ){}

    start(port: number): void {
        this.app.listen(port, () => {
            console.log("Server is running ...")
        })
    }
    
    use(library: any): void {
        this.app.use(library)
    }
    
}