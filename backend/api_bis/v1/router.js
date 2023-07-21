const router = require("express").Router();
const controllers = require("./controllers");
const { MqttTopic } = require("../../mqttserver");
const mqttTopic = new MqttTopic();

// Basic CRUD
router
    .route("/")
    .post(controllers.create)
    .get(controllers.list)
    .patch(controllers.edit)
    .delete(controllers.delete);

router.get("/:idBis", controllers.detailBis);
router.patch("/driver/set", controllers.setSupirBis);
router.patch("/status/set-emergency", controllers.setKondisiDarurat);
router.patch("/status/unset-emergency", controllers.setKondisiNormal);
router.patch("/position/set", controllers.setBusPosition);

module.exports = router;
