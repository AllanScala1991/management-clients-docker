import cors from "cors"
import server from "./services/server"

const PORT = process.env.PORT

server.use(cors())

server.start(8000)