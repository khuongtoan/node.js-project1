const jwt = require("jsonwebtoken");
const AccountAdmin = require("../../models/account-admin-model");
const { pathAdmin } = require("../../config/variable-config");

module.exports.verifyToken = async (req, res, next) => {

	const token = req.cookies.token;
	
  try {
		if (!token) {
			res.redirect(`/${pathAdmin}/account/login`);
			return;
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { id, email } = decoded;

		const existAccount = await AccountAdmin.findOne({
			_id: id,
			email: email,
			status: "active",
		});

		if (!existAccount) {
			res.clearCookie("token");
			res.redirect(`/${pathAdmin}/account/login`);
			return;
		}
	} catch (error) {
		res.clearCookie("token");
		res.redirect(`/${pathAdmin}/account/login`);
	}

	next();
};
