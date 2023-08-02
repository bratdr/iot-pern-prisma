const router = require("express").Router();
const controllers = require("./controllers");

// Basic CRUD
router
    .route("/")
    .post(controllers.create)
    .get(controllers.list)
    .patch(controllers.edit)
    .delete(controllers.delete);

router.route("/:id").get(controllers.detail);

router.post("/siswa/pair", controllers.hubungkanSekolahDenganSiswa);
router.patch("/siswa/unpair", controllers.putuskanHubunganSekolahDenganSiswa);
router.get("/siswa/list/:idSekolah", controllers.daftarSiswaDiSekolah);

module.exports = router;
