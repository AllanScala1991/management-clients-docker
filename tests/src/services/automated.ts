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

    doVisit(url: string): void {
        this.adapter.doVisit(url)
    }

    doType(locator: string, text: string): void {
        this.adapter.doType(locator, text)
    }
    
}

export default new Automated()