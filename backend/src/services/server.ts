import { ExpressAdapter } from "../adapters/express/express";
import { IServer } from "../interfaces/server";

class ServerService implements IServer {
    constructor(
        private readonly server: IServer = new ExpressAdapter()
    ){}

    start(port: number): void {
        this.server.start(port)
    }

    use(library: any): void {
        this.server.use(library)
    }   
}

export default new ServerService()