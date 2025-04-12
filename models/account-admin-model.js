const mongoose = require("mongoose");

const schema1 = mongoose.Schema({
	fullName: String,
	email: String,
	password: String,
	status: String,
});

const AccountAdmin = mongoose.model("AccountAdmin", schema1, "accounts-admin");

module.exports = AccountAdmin;
