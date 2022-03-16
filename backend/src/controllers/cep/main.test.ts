import { CepController } from "."


describe("Cep Controller", () => {
    it("Should validate find cep successfully", async () => {
        const findCep = await new CepController().findCep('69316226')

        expect(findCep.data).toHaveProperty('cep')
        expect(findCep).toHaveProperty('status')
        expect(findCep.data.logradouro).toEqual('Rua João Ferreira Mota')
        expect(findCep.data.bairro).toEqual('Nova Cidade')
        expect(findCep.data.localidade).toEqual('Boa Vista')
        expect(findCep.data.uf).toEqual('RR')
        expect(findCep.status).toBeTruthy
    })

    it("Should validate find with empty cep", async () => {
        const findWithEmptyCep = await new CepController().findCep('')

        expect(findWithEmptyCep).toHaveProperty('message')
        expect(findWithEmptyCep).toHaveProperty('status')
        expect(findWithEmptyCep.message).toEqual('Insira um CEP válido.')
        expect(findWithEmptyCep.status).toBeFalsy
    })

    it("Should validate find with cep greater value", async () => {
        const findCepWithGreaterValue = await new CepController().findCep('888888888')

        expect(findCepWithGreaterValue).toHaveProperty('message')
        expect(findCepWithGreaterValue).toHaveProperty('status')
        expect(findCepWithGreaterValue.message).toEqual('Insira um CEP válido.')
        expect(findCepWithGreaterValue.status).toBeFalsy
    })

    it("Should validate find with cep lower value", async () => {
        const findCepWithLowerValue = await new CepController().findCep('88')

        expect(findCepWithLowerValue).toHaveProperty('message')
        expect(findCepWithLowerValue).toHaveProperty('status')
        expect(findCepWithLowerValue.message).toEqual('Insira um CEP válido.')
        expect(findCepWithLowerValue.status).toBeFalsy
    })
})