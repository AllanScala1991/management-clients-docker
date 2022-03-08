import { CepService } from "."

describe("CEP Service", () => {
    test("Should validate find CEP", async () => {
        const cep = await new CepService().findCep("83701300")

        expect(cep).not.toBeNull
        expect(cep.logradouro).toEqual("Rua Alagoas")
        expect(cep.bairro).toEqual("Iguaçu")
        expect(cep.localidade).toEqual("Araucária")
    })
})