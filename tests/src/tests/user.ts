import { LOGIN, POPUP, REGISTER } from "src/locators"
import Test from "../services/automated"
import Random from "../services/random"

Test.describe("User", () => {
    Test.beforeEach(() => {
        Test.doVisit(Cypress.env("BASE_URL"))
        Test.doClick(LOGIN.BTN_REGISTER)
    })

    Test.scenario("Should validate create user successfully", () => {
        Test.doType(REGISTER.INPUT_USERNAME, Random.generateName())
        Test.doType(REGISTER.INPUT_PASSWORD, "any password")
        Test.doType(REGISTER.INPUT_EMAIL, Random.generateEmail())
        Test.doClick(REGISTER.BTN_CONFIRM)
        Test.doExpectContain(POPUP.MESSAGE, "Usuário registrado com sucesso.")
    })

    Test.scenario("Should validate create user with invalid email", () => {
        Test.doType(REGISTER.INPUT_USERNAME, Random.generateName())
        Test.doType(REGISTER.INPUT_PASSWORD, "any password")
        Test.doType(REGISTER.INPUT_EMAIL, "invalidemail.com")
        Test.doClick(REGISTER.BTN_CONFIRM)
        Test.doExpectContain(POPUP.MESSAGE, "E-mail inválido, tente novamente.")
    })

    Test.scenario("Should validate create user with empty values", () => {
        Test.doClick(REGISTER.BTN_CONFIRM)
        Test.doExpectContain(POPUP.MESSAGE, "Todos os campos devem ser preenchidos.")
    })

    Test.scenario("Should validate create exists user", () => {
        Test.doType(REGISTER.INPUT_USERNAME, "exist user")
        Test.doType(REGISTER.INPUT_PASSWORD, "exist")
        Test.doType(REGISTER.INPUT_EMAIL, "exist@mail.com")
        Test.doClick(REGISTER.BTN_CONFIRM)
        Test.doClick(POPUP.BTN_OK)
        Test.doClick(LOGIN.BTN_REGISTER)

        Test.doType(REGISTER.INPUT_USERNAME, "exist user")
        Test.doType(REGISTER.INPUT_PASSWORD, "exist")
        Test.doType(REGISTER.INPUT_EMAIL, "exist@mail.com")
        Test.doClick(REGISTER.BTN_CONFIRM)
        Test.doExpectContain(POPUP.MESSAGE, "Já existe um usuário com essas informações.")
    })

    Test.scenario("Should validate back button redirect", () => {
        Test.doClick(REGISTER.BTN_BACK)
        Test.doExpectByVisible(LOGIN.BTN_LOGIN)
    })
})

