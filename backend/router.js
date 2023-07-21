const router = require("express").Router();
const { MqttTopic } = require("./mqttserver");
const mqttTopic = new MqttTopic();

const APP_ROUTER_V1 = require("./app/router");
const ROLE_V1 = require("./api_role/v1/router");
const USER_V1 = require("./api_user/v1/router");
const SUPIR_V1 = require("./api_supir/v1/router");
const SEKOLAH_V1 = require("./api_sekolah/v1/router");
const SISWA_V1 = require("./api_siswa/v1/router");
const BIS_V1 = require("./api_bis/v1/router");
const COMMUTE_V1 = require("./api_commute/v1/router");
const MQTT_HANDLER = require("./mqtt_handler/router");

router.use("/", APP_ROUTER_V1);
router.use("/api/v1/commute", COMMUTE_V1);
router.use("/api/v1/role", ROLE_V1);
router.use("/api/v1/user", USER_V1);
router.use("/api/v1/supir", SUPIR_V1);
router.use("/api/v1/sekolah", SEKOLAH_V1);
router.use("/api/v1/siswa", SISWA_V1);
router.use("/api/v1/bis", BIS_V1);
mqttTopic.use("", MQTT_HANDLER);

module.exports = { router, mqttTopic };
