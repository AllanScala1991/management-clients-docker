import { IAutomated } from "../../interfaces/IAutomated";


export class Cypress implements IAutomated {

    constructor(
        private timeout: number = 30000
    ){}

    describe(title: string, callback: any): void {
        describe(title, callback)
    }

    scenario(title: string, callback: any): void {
        it(title, callback)
    }

    beforeEach(callback: any): void {
        beforeEach(callback)
    }

    doVisit(url: string): void {
        cy.visit(url)
    }

    doType(locator: string, text: string): void {
        cy.get(locator, {timeout: this.timeout}).type(text)
    }

    doClick(locator: string): void {
        cy.get(locator, {timeout: this.timeout}).click({force: true})
    }
    
    doExpectContain(locator: string, text: string): void {
        cy.get(locator)
        .should("contain", text)
    }

    doExpectByVisible(locator: string): void {
        cy.get(locator)
        .should("be.visible")
    }
}