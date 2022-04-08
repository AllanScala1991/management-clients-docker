import Test from "../services/automated"


Test.describe("Test", () => {
    Test.scenario("Test", () => {
        Test.doVisit("https://www.google.com")
    })
})