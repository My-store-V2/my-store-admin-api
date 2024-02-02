const express = require("express");
const cors = require("cors");
const config = require("./config");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const Sequelize = require("sequelize");

const app = express();

// parse json request body
app.use(express.json());

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        port: config.db_port,
        host: config.host,
        dialect: config.dialect,
        dialectOptions: {
            connectTimeout: 60000,
        },
    }
);

// Swagger options
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Admin API template for Products",
            version: "1.0.1",
            description: "Products admin api documentation",
        },
        servers: [
            {
                url: `http://localhost:${config.port}`,
            },
        ],
    },
    apis: ["src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// cors
app.use(
    cors({
        origin: config.frontend_url,
    })
);

//access to public folder
app.use(express.static(__dirname + "/public"));

// initial route
app.get("/", (req, res) => {
    res.send({ message: "Welcome to my-store-admin-api." });
});

// api routes prefix
app.use("/api", require("./routes/index"));

// run server

sequelize
    .sync()
    .then(() => {
        console.log("Database Synchronised");
    })
    .catch((err) => {
        console.error("database synchronisation error :", err);
    });

app.listen(config.port, () => {
    console.log(`Server launch on http://localhost:${config.port}`);
});

module.exports = app;
