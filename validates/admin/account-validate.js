const Joi = require("joi");

module.exports.registerPost = (req, res, next) => {
	const schema = Joi.object({
		fullName: Joi.string().required().min(5).max(50).messages({
			"string.empty": "vui lòng nhập họ tên!",
			"string.min": "họ tên phải có ít nhất 5 kí tự",
			"string.max": "họ tên không được vượt quá 50 ký tự",
		}),

		email: Joi.string().required()
		.email()
		.messages({
			"string.empty": "vui lòng nhập họ !",
			"string.email": "Email không đúng định dạng"
		}),

		password: Joi.string().required()
		.min(8)
		.custom((value, helpers) => {
			if(!/[A-Z]/.test(value)){
				return helpers.error('password.uppercase')
			}
			if (!/[a-z]/.test(value)) {
				return helpers.error("password.lowercase");
			}
			if(!/\d/.test(value)){
				return helpers.error('password.number')
			}
			if (!/[@$!%*?&]/.test(value)) {
				return helpers.error("password.special");
			}
			return value;
		})
		.messages({
			"string.empty": "vui lòng nhập mật khẩu!",
			"string.min":"Mật khẩu phải chứa ít nhất 8 kí tự!",
			"password.uppercase":"Mật khẩu phải chứa 1 chữ cái in hoa!",
			"password.lowercase":"Mật khẩu phải chứa 1 chữ cái thường!",
			"password.number":"Mật khẩu phải chứa 1 số!",
			"password.special":"Mật khẩu phải chứa 1 kí tự đặc biệt!",
		}),
	});

	const { error } = schema.validate(req.body);

	if (error) {
		const errorMessage = error.details[0].message;

		res.json({
			code: "error",
			message: errorMessage,
		});
		return;
	}

	next();
};
