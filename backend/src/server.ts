import cors from "cors"
import bodyParser from "body-parser"
import "dotenv/config"
import express from "express"

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(require("./routes/user"))
app.use(require("./routes/login"))
app.use(require("./routes/customer"))
app.use(require("./routes/report"))
app.use(require("./routes/cep"))

app.listen(3000, () => {
    console.log("Server is running ...")
})