import axios from "axios"
import "dotenv/config"

export class CepService {
    async findCep(cep: string): Promise<any> {
        const getCep = await axios.get(`${process.env.CEP_API}/${cep}/json`)
        return getCep.data
    }
}