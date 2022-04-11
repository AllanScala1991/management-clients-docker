export interface IAutomated {
    describe(title: string, callback: any): void
    scenario(title: string, callback: any): void
    beforeEach(callback: any): void
    doVisit(url: string): void
    doType(locator: string, text: string): void
    doClick(locator: string): void
    doExpectContain(locator: string, text: string): void
    doExpectByVisible(locator: string): void
}