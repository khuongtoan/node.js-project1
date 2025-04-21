const mongoose = require("mongoose");

const schema = mongoose.Schema(
	{
		email: String,
		otp: String,
		expireAt: {
			type: Date,
			expires: 0,
		},
	},
	{
		timestamps: true, // tự động sinh ra trường createAt và updatedAt
	},
);

const ForgotPassword = mongoose.model("ForgotPassword", schema, "forgot-password");

module.exports = ForgotPassword;
