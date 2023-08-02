if (process.env.NODE_ENV !== "PRODUCTION") require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const { router: ROUTER, mqttTopic } = require("./router");
const { MqttServer } = require("./mqttserver");

MqttServer.createConnection();
MqttServer.use(mqttTopic);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/", ROUTER);

app.listen(PORT, () => {
    console.log(`🚀 SERVER RUNNING IN PORT ${PORT}`);
});
