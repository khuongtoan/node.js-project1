const router = require("express").Router();
const multer = require("multer");

const categoryController = require("../../controllers/admin/category-controller");

const cloudinaryHelper = require("../../helpers/cloudinary-helpers");

const upload = multer({storage: cloudinaryHelper.storage});

const categoryValidate = require("../../validates/admin/category-validate");

router.get("/list", categoryController.list);

router.get("/create", categoryController.create);
router.post(
  "/create",
  upload.single('avatar'),categoryValidate.createPost,
  categoryController.createPost
);

module.exports = router;
