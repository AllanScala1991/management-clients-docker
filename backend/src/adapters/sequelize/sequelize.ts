import { ModelCtor, Sequelize } from "sequelize/types";
import { IDatabase } from "../../interfaces/database";


export class SequelizeAdapter implements IDatabase {

    connection(): Sequelize {
        return new Sequelize('database', 'postgres', 'allan100291',{
            dialect: 'postgres',
            host: "localhost",
            port: 5432
        })
    }

    async create(model: ModelCtor<any>, params: {}): Promise<any> {
        try {
            return await model.create(params)
        } catch (error) {
            return error
        }
    }

    async read(model: ModelCtor<any>, params: {}): Promise<any> {
        try {
            return await model.findAll({
                raw: true,
                where: params
            })
        } catch (error) {
            return error
        }
    }

    async update(model: ModelCtor<any>, params: {}, id: string): Promise<any> {
        try {
            return await model.update(params, {
                where: {
                    id: id
                }
            })
        } catch (error) {
            return error
        }
    }

    async delete(model: ModelCtor<any>, id: string): Promise<any> {
        try {
            return await model.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            return error
        }
    }
    
}