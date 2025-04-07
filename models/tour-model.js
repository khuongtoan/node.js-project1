const mongoose = require("mongoose");

const tour = mongoose.model(
	"Tour",
	{
		name: String,
		vehicle: String,
	},
	"tours",
);
module.exports = tour;
