const AccountAdmin = require("../../models/account-admin-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res) => {
	res.render("admin/pages/login", {
		pageTitle: "Đăng nhập",
	});
};

module.exports.register = async (req, res) => {
	res.render("admin/pages/register", {
		pageTitle: "Đăng ký",
	});
};

module.exports.registerPost = async (req, res) => {
	const { fullName, email, password } = req.body;

	const existAccount = await AccountAdmin.findOne({
		email: email,
	});

	if (existAccount) {
		res.json({
			code: "error",
			message: "Email đã tồn tại trong hệ thống!",
		});
		return;
	}

	// mã hóa mật khẩu với bcrypt
	const salt = await bcrypt.genSalt(10); // tạo chuỗi ngẫu nhiên 10 ký tự
	const hashedPassword = await bcrypt.hash(password, salt);

	const newAccount = new AccountAdmin({
		fullName: fullName,
		email: email,
		password: hashedPassword,
		status: "initial",
	});

	await newAccount.save();

	res.json({
		code: "success",
		message: "Đăng ký tài khoản thành công!",
	});
};

module.exports.loginPost = async (req, res) => {
	const { email, password } = req.body;

	const existAccount = await AccountAdmin.findOne({
		email: email,
	});

	if (!existAccount) {
		res.json({
			code: "error",
			message: "Email không tồn tại trong hệ thống!",
		});
		return;
	}

	const isPasswordValid = await bcrypt.compare(password, existAccount.password);

	if (!isPasswordValid) {
		res.json({
			code: "error",
			message: "Mật khẩu không đúng!",
		});
		return;
	}

	if (existAccount.status != "active") {
		res.json({
			code: "error",
			message: "Tài khoản chưa được kích hoạt!",
		});
		return;
	}

	// tạo JWT
	const token = jwt.sign(
		{
			id: existAccount.id,
			email: existAccount.email,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "1d", //token có thời hạn 1 ngày
		},
	);

	// lưu token vào cookie
	res.cookie("token", token, {
		maxAge: 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: "strict",
	});

	return res.json({
		code: "success",
		message: "đăng nhập thành công",
	});
};

module.exports.registerInitial = async (req, res) => {
	res.render("admin/pages/register-initial", {
		pageTitle: "Tài khoản đã được khởi tạo",
	});
};

module.exports.forgotPassword = async (req, res) => {
	res.render("admin/pages/forgot-password", {
		pageTitle: "Quên mật khẩu",
	});
};

module.exports.otpPassword = async (req, res) => {
	res.render("admin/pages/otp-password", {
		pageTitle: "Nhập mã OPT",
	});
};

module.exports.resetPassword = async (req, res) => {
	res.render("admin/pages/reset-password", {
		pageTitle: "Đổi mật khẩu",
	});
};
