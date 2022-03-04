import { ReportService } from "../../services/report";
export class ReportController {
    constructor(
        private readonly report = new ReportService()
    ){}

    async mountCustomersReport(userId: string) {
        try {
            if(!userId) return {message: "ID do usuário inválido, efetue um novo login.", status: false}
    
            const customerReport = await this.report.mountCustomersReport(userId)
    
            return {data: customerReport, status: true}
            
        } catch (error) {
            return {message: error, status: false}
        }
    }
}