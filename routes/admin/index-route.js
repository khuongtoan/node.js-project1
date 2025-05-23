const router = require("express").Router();

const accountRoutes = require("./account-route");
const dashboardRoutes = require("./dashboard-route");
const categoryRoutes = require("./category-route");
const tourRoutes = require("./tour-route");
const orderRoutes = require("./order-route");
const userRoutes = require("./user-route");
const contactRoutes = require("./contact-route");
const settingRoutes = require("./setting-route");
const profileRoutes = require("./profile-route");

const authMiddleware = require("../../middlewares/admin/auth-middleware");

// xóa không lưu bộ nhớ đệm
router.use((req, res, next) => {
	res.setHeader("Cache-Control", "no-store");
	next();
});

router.use("/account", accountRoutes);

router.use(authMiddleware.verifyToken);
router.use("/dashboard", dashboardRoutes);
router.use("/category", categoryRoutes);
router.use("/tour", tourRoutes);
router.use("/order", orderRoutes);
router.use("/user", userRoutes);
router.use("/contact", contactRoutes);
router.use("/setting", settingRoutes);
router.use("/profile", profileRoutes);

// 404 not found
router.get("/*", (req, res) => {
	res.render("admin/pages/error-404", {
		pageTitle: "404 Not Found",
	});
});

module.exports = router;
