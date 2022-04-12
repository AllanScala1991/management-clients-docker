import { HOME, LOGIN, CUSTOMER, DASHBOARD, USER } from "src/locators"
import Test from "../services/automated"

Test.describe("Home", () => {
    Test.beforeEach(() => {
        Test.doVisit(Cypress.env("BASE_URL"))
        Test.doType(LOGIN.INPUT_USERNAME, Cypress.env("LOGIN"))
        Test.doType(LOGIN.INPUT_PASSWORD, Cypress.env("PASSWORD"))
        Test.doClick(LOGIN.BTN_LOGIN)
    })

    Test.scenario("Should validate customer button redirect", () => {
        Test.doClick(HOME.BTN_CUSTOMER)
        Test.doExpectByVisible(CUSTOMER.BTN_REGISTER)
    })

    Test.scenario("Should validate dashboard button redirect", () => {
        Test.doClick(HOME.BTN_DASHBOARD)
        Test.doExpectByVisible(DASHBOARD.CONTAINER_TOTAL_USERS)
        Test.doExpectByVisible(DASHBOARD.CONTAINER_LAST_REGISTER)
    })

    Test.scenario("Should validate user button redirect", () => {
        Test.doClick(HOME.BTN_USER)
        Test.doExpectByVisible(USER.INPUT_USERNAME)
    })

    Test.scenario("Should validate logout", () => {
        Test.doClick(HOME.BTN_LOGOUT)
        Test.doExpectByVisible(LOGIN.BTN_LOGIN)
    })
})