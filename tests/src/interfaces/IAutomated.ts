export interface IAutomated {
    describe(title: string, callback: any): void
    scenario(title: string, callback: any): void
    doVisit(url: string): void
    doType(locator: string, text: string): void
}