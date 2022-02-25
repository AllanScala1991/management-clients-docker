import cors from "cors"
import server from "./services/server"

server.use(cors())

server.start(3000)