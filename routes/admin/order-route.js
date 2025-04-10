const router = require("express").Router();

const tourController = require("../../controllers/admin/order-controller");

router.get("/list", tourController.list);

router.get("/edit", tourController.edit);

module.exports = router;
