const router = require("express").Router();
const controllers = require("./controllers");

// Basic CRUD
router
    .route("/")
    .post(controllers.create)
    .get(controllers.list)
    .patch(controllers.edit)
    .delete(controllers.delete);

router.post("/card/pair", controllers.hubungkanSiswaKeKartu);
router.patch("/card/unpair", controllers.pustuskanHubungkanSiswaKeKartu);
router.post("/school/pair", controllers.hubungkanSiswaKeSekolah);
router.patch("/school/unpair", controllers.putuskanHubungkanSiswaKeSekolah);

module.exports = router;
