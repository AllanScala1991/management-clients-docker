import { CUSTOMER, HOME, LOGIN } from "src/locators"
import Test from "../services/automated"

Test.describe("Customer", () => {
    Test.beforeEach(() => {
        Test.doVisit(Cypress.env("BASE_URL"))
        Test.doType(LOGIN.INPUT_USERNAME, Cypress.env("LOGIN"))
        Test.doType(LOGIN.INPUT_PASSWORD, Cypress.env("PASSWORD"))
        Test.doClick(LOGIN.BTN_LOGIN)
        Test.doClick(HOME.BTN_CUSTOMER)
    })

    Test.scenario("Should validate register customer successfully", () => {
        Test.doClick(CUSTOMER.BTN_REGISTER)
        Test.doType(CUSTOMER.INPUT_NAME, "Automation Test")
        Test.doType(CUSTOMER.INPUT_BIRTH, "10/10/2021")
    })
})