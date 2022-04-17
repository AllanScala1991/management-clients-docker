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

    before(callback: any): void {
        before(callback)
    }

    after(callback: any): void {
        after(callback)
    }

    doVisit(url: string): void {
        cy.visit(url)
    }

    doType(locator: string, text: string): void {
        cy.get(locator, {timeout: this.timeout})
        .should("be.visible")
        .type(text)
    }

    doClick(locator: string): void {
        cy.get(locator, {timeout: this.timeout})
        .should("be.visible")
        .click({force: true})
    }
    
    doExpectContain(locator: string, text: string): void {
        cy.get(locator)
        .should("contain", text)
    }

    doExpectByVisible(locator: string): void {
        cy.get(locator)
        .should("be.visible")
    }

    doRequest(url: string, method: string, headers: {}, body: {}): any {
        cy.request({
            url: url,
            method: method,
            headers: headers,
            body: body
        }).then(res => {
            return cy.wrap(res.body.token)
        })
    }

    doEachClick(locator: string) {
        cy.get(locator, {timeout: this.timeout})
        .should('be.visible')
        .each(element => {
            cy.wrap(element).click()
        })
    }

    doWait(seconds: number) {
        cy.wait(seconds)
    }
}