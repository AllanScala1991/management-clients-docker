export interface IServer {
    start(port: number): void

    use(library: any): void
}