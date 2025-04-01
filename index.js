const express = require("express");
const path = require("path");

require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE);

const Tour = mongoose.model(
	"Tour",
	{
		name: String,
		vehicle: String,
	},
	"tours",
);

const app = express();
const port = 3000;
// thiết lập views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// thiết lập thư mục chứ file tĩnh của fontend
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.render("client/pages/home.pug");
});

app.get("/tours", async (req, res) => {
	const tourList = await Tour.find({});
	console.log(tourList);
	res.render("client/pages/tour-list.pug", {
		tourLists: tourList,
	});
});

app.listen(port, () => {
	console.log(`website is running on port ${port}`);
});

// mongodb+srv://kxtdumbo:D5hpw3ulBSrLc4jl@project-01-backend-node.7ijbxsg.mongodb.net/tourManagement-project1
