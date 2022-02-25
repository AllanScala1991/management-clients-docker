import cors from "cors"
import bodyParser from "body-parser"
import "dotenv/config"
import express from "express"

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(require("./routes/index"))

app.listen(3000, () => {
    console.log("Server is running ...")
})