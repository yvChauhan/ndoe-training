import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: "localhost",
    user: "root",
    database: "myShop",
    password: "Thunder@13",
});

