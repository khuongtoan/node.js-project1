module.exports.generateRandomNumber = (length) => {
	let result = Math.floor(Math.random() * Math.pow(10, length))
		.toString()
		.padStart(length, "0");
	return result;
};
