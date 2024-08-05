import { Sequelize }  from "sequelize";

export const sequelize = new Sequelize('myShop', 'root', 'Thunder@13', {
    dialect: 'mysql',
    host: 'localhost',
});
