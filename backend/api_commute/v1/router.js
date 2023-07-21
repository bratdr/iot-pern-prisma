const router = require("express").Router();
const controller = require("./controllers");

router.post("/start", controller.startCommuting);
router.get("/list", controller.commutingList);
router.get("/detail", controller.detail);
router.get("/cari-siswa", controller.siswaCommute);

module.exports = router;
