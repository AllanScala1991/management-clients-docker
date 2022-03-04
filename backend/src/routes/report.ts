import { Router, Request, Response } from "express";
import { ReportController } from "../controllers/report";

const app = Router()


app.get("/report/customer/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId

    const mountCustomerReport = await new ReportController().mountCustomersReport(userId)

    res.send(mountCustomerReport)
})

module.exports = app