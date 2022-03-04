import { CepService } from "../../services/cep"

export class CepController {

    async findCep(cep: string): Promise<any> {

        try {
            if(!cep || cep.length < 8 || cep.length > 8) {
                return {message: "Insira um CEP válido.", status: false}
            }
    
            const getCep = await new CepService().findCep(cep)
    
            return {data: getCep, status: true}
            
        } catch (error) {
            return {message: error, status: false}
        }
    }
}