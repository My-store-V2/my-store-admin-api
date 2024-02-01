const express = require("express");
const cors = require("cors");
const config = require("./config");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app = express();

// parse json request body
app.use(express.json());

// Swagger options
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Node API template",
            version: "1.0.0",
            description: "A sample Api",
        },
        servers: [
            {
                url: `http://localhost:${config.port}`,
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
console.log(JSON.stringify(swaggerSpec, null, 2));

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
    res.send({ message: "Welcome to app-store-api application." });
});

// api routes prefix
app.use("/api", require("./routes/sampleRoutes"));

// run server
app.listen(config.port, () => {
    console.log("server launch");
});

module.exports = app;
