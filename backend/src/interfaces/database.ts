export interface IDatabase {
    connection(): any
    create(model: any, params: {}): Promise<any>
    read(model: any, params: {}): Promise<any>
    update(model: any, params: {}, id: string): Promise<any>
    delete(model: any, id: string): Promise<any>
}