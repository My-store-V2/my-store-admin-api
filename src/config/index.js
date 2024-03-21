require("dotenv").config();

const config = {
    port: process.env.PORT,
    frontend_url: process.env.FRONTEND_URL,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    db_port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: "mysql",
};
module.exports = config;
