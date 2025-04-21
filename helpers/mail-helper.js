const nodemailer = require("nodemailer");

module.exports.sendMail = (email, subject, content) => {
	// Create a transporter object
	const security = process.env.EMAIL_SECURE == "true";

	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: security,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	// Configure the mailoptions object
	const mailOptions = {
		from: "kxtdumbo@gmail.com",
		to: email,
		subject: subject,
		html: content,
	};

	// Send the email
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log("Error:", error);
		} else {
			console.log("Email sent: ", info.response);
		}
	});
};
