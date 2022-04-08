import { IAutomated } from "../../interfaces/IAutomated";


export class Cypress implements IAutomated {

    describe(title: string, callback: any): void {
        describe(title, callback)
    }

    scenario(title: string, callback: any): void {
        it(title, callback)
    }

    doVisit(url: string): void {
        cy.visit(url)
    }

    doType(locator: string, text: string): void {
        cy.get(locator).type(text)
    }
    
}