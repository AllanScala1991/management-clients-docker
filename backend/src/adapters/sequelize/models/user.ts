import { SequelizeAdapter } from "../sequelize";
import { STRING } from "sequelize";


const userModel = new SequelizeAdapter().connection().define('Users',{
    User: {
        type: STRING,
        allowNull: false,
        validate: {
            notNull : true,
            notEmpty: true
        }
    },

    Password: {
        type: STRING,
        allowNull: false,
        validate: {
            notNull : true,
            notEmpty: true
        }
    },

    Email: {
        type: STRING,
        allowNull: false,
        validate: {
            notNull : true,
            notEmpty: true
        }
    }
}).sync({ force: false })

export default userModel