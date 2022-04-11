import { HOME, LOGIN, POPUP, REGISTER } from "src/locators"
import Test from "../services/automated"


Test.describe("LOGIN", () => {
    Test.beforeEach(() => {
        Test.doVisit(Cypress.env("BASE_URL"))
    })

    Test.scenario("Should validate login access successfully", () => {
        Test.doType(LOGIN.INPUT_USERNAME, Cypress.env("LOGIN"))
        Test.doType(LOGIN.INPUT_PASSWORD, Cypress.env("PASSWORD"))
        Test.doClick(LOGIN.BTN_LOGIN)
        Test.doExpectByVisible(HOME.CONTAINER_TOTAL_USERS)
    })

    Test.scenario("Should validate login with empty inputs", () => {
        Test.doExpectByVisible(LOGIN.BTN_LOGIN)
        Test.doClick(LOGIN.BTN_LOGIN)
        Test.doExpectByVisible(POPUP.MODAL)
        Test.doExpectContain(POPUP.MESSAGE, "Usuário ou Senha estão incorretos.")
    })

    Test.scenario("Should validate login with invalid user and password", () => {
        Test.doType(LOGIN.INPUT_USERNAME, "invalid user")
        Test.doType(LOGIN.INPUT_PASSWORD, "invalid password")
        Test.doClick(LOGIN.BTN_LOGIN)
        Test.doExpectByVisible(POPUP.MODAL)
        Test.doExpectContain(POPUP.MESSAGE, "Usuário ou Senha estão incorretos.")
    })

    Test.scenario("Should validate login with invalid password", () => {
        Test.doType(LOGIN.INPUT_USERNAME, Cypress.env("LOGIN"))
        Test.doType(LOGIN.INPUT_PASSWORD, "invalid_password")
        Test.doClick(LOGIN.BTN_LOGIN)
        Test.doExpectByVisible(POPUP.MODAL)
        Test.doExpectContain(POPUP.MESSAGE, "Usuário ou Senha estão incorretos.")
    })

    Test.scenario("Should validate button register redirect", () => {
        Test.doClick(LOGIN.BTN_REGISTER)
        Test.doExpectByVisible(REGISTER.CONTAINER)
    })

})