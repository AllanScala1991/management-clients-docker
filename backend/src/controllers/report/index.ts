import { ReportService } from "services/report";
export class ReportController {
    constructor(
        private readonly report = new ReportService()
    ){}

    async mountCustomersReport(userId: string) {
        try {
            if(!userId) return {message: "ID do usuário inválido, efetue um novo login."}
    
            const customerReport = await this.report.mountCustomersReport(userId)
    
            return customerReport
            
        } catch (error) {
            return error
        }
    }
}