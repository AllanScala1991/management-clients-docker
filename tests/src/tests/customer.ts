import { CUSTOMER, HOME, LOGIN, POPUP } from "src/locators"
import Test from "../services/automated"

Test.describe("Customer", () => {
    Test.beforeEach(() => {
        Test.doVisit(Cypress.env("BASE_URL"))
        Test.doType(LOGIN.INPUT_USERNAME, Cypress.env("LOGIN"))
        Test.doType(LOGIN.INPUT_PASSWORD, Cypress.env("PASSWORD"))
        Test.doClick(LOGIN.BTN_LOGIN)
        Test.doWait(1000)
    })

    Test.scenario("Should validate register customer successfully", () => {
        Test.doClick(HOME.BTN_CUSTOMER)
        Test.doClick(CUSTOMER.BTN_REGISTER)
        Test.doType(CUSTOMER.INPUT_NAME, "Automation Test")
        Test.doType(CUSTOMER.INPUT_BIRTH, "2021-10-10")
        Test.doType(CUSTOMER.INPUT_CEP, "83701300")
        Test.doType(CUSTOMER.INPUT_NUMBER, "22")
        Test.doType(CUSTOMER.INPUT_PHONE, "41999999999")
        Test.doType(CUSTOMER.INPUT_EMAIL, "automation@mail.com")
        Test.doClick(CUSTOMER.BTN_SAVE)
        Test.doExpectContain(POPUP.MESSAGE, "Cliente registrado com sucesso.")
    })

    Test.scenario("Should validate register customer with invalid e-mail", () => {
        Test.doClick(HOME.BTN_CUSTOMER)
        Test.doClick(CUSTOMER.BTN_REGISTER)
        Test.doType(CUSTOMER.INPUT_NAME, "Automation Test")
        Test.doType(CUSTOMER.INPUT_BIRTH, "2021-10-10")
        Test.doType(CUSTOMER.INPUT_CEP, "83701300")
        Test.doType(CUSTOMER.INPUT_NUMBER, "22")
        Test.doType(CUSTOMER.INPUT_PHONE, "41999999999")
        Test.doType(CUSTOMER.INPUT_EMAIL, "invalid_email.com")
        Test.doClick(CUSTOMER.BTN_SAVE)
        Test.doExpectContain(POPUP.MESSAGE, "Email inválido, tente novamente.")
    })

    Test.scenario("Should validate register customer with empty values", () => {
        Test.doClick(HOME.BTN_CUSTOMER)
        Test.doClick(CUSTOMER.BTN_REGISTER)
        Test.doClick(CUSTOMER.BTN_SAVE)
        Test.doExpectContain(POPUP.MESSAGE, "Todos os campos devem ser preenchidos.")
    })

    Test.scenario("Should validate register exist customer", () => {
        Test.doClick(HOME.BTN_CUSTOMER)
        Test.doClick(CUSTOMER.BTN_REGISTER)
        Test.doType(CUSTOMER.INPUT_NAME, "Automation Test")
        Test.doType(CUSTOMER.INPUT_BIRTH, "2021-10-10")
        Test.doType(CUSTOMER.INPUT_CEP, "83701300")
        Test.doType(CUSTOMER.INPUT_NUMBER, "22")
        Test.doType(CUSTOMER.INPUT_PHONE, "41999999999")
        Test.doType(CUSTOMER.INPUT_EMAIL, "automation@mail.com")
        Test.doClick(CUSTOMER.BTN_SAVE)
        Test.doExpectContain(POPUP.MESSAGE, "Já existe um cliente registrado com esses dados.")
        Test.doClick(POPUP.BTN_OK)
    })

    Test.after(() => {
        Test.doClick(HOME.BTN_CUSTOMER)
        Test.doClick(CUSTOMER.BTN_SEARCH)
        Test.doEachClick(CUSTOMER.BTN_DELETE)
        Test.doExpectContain(POPUP.MESSAGE, "Cliente deletado com sucesso.")
        Test.doClick(POPUP.BTN_OK)
    })
})