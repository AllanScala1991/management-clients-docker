import { Cypress } from "src/adapters/cypress/main";
import { IAutomated } from "src/interfaces/IAutomated";


class Automated implements IAutomated {

    constructor(
        private readonly adapter: IAutomated = new Cypress()
    ){}

    describe(title: string, callback: any): void {
        this.adapter.describe(title, callback)
    }

    scenario(title: string, callback: any): void {
        this.adapter.scenario(title, callback)
    }

    beforeEach(callback: any): void {
        this.adapter.beforeEach(callback)
    }

    before(callback: any): void {
        this.adapter.before(callback)
    }

    after(callback: any): void {
        this.adapter.after(callback)
    }

    doVisit(url: string): void {
        this.adapter.doVisit(url)
    }

    doType(locator: string, text: string): void {
        this.adapter.doType(locator, text)
    }

    doClick(locator: string): void {
        this.adapter.doClick(locator)
    }

    doExpectContain(locator: string, text: string): void {
        this.adapter.doExpectContain(locator, text)
    }

    doExpectByVisible(locator: string): void {
        this.adapter.doExpectByVisible(locator)
    }

    doRequest(url: string, method: string, headers: {} = {}, body: {} = {}) {
        return this.adapter.doRequest(url, method, headers, body)
    }

    doEachClick(locator: string) {
        this.adapter.doEachClick(locator)
    }

    doWait(seconds: number) {
        this.adapter.doWait(seconds)
    }
    
}

export default new Automated()