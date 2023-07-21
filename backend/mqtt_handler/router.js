const controllers = require("./controllers");
const { MqttTopic } = require("../mqttserver");
const mqttTopic = new MqttTopic();

mqttTopic.listener(
    "v2.0/subs/APP6483d1b203bc171879/DEV64842a9095f2359715",
    controllers.setBusPositionMQTT
);

module.exports = mqttTopic;
