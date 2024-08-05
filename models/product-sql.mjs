import { DataTypes }  from "sequelize";

import { sequelize } from "../database/sql/database-sequelize.mjs";

export const ProductSql = sequelize.define('product', {
    code: {
        type: DataTypes.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
});