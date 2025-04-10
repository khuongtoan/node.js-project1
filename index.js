const express = require("express");
const path = require("path");

require("dotenv").config();
const database = require("./config/database-config");
const clientRoutes = require("./routes/client/index-route");
const adminRoutes = require("./routes/admin/index-route");
const homeController = require("./controllers/client/home-controller");
const variableConfig = require("./config/variable-config");

// thiết lập port và khai báo instance để sử dụng express
const app = express();
const port = 3000;
// tạo kết nối với database
database.connect();

// thiết lập views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// thiết lập thư mục chứ file tĩnh của fontend
app.use(express.static(path.join(__dirname, "public")));

// tạo biến toàn cục
app.locals.pathAdmin = variableConfig.pathAdmin;

// thiết lập đường dẫn
app.use(`/${variableConfig.pathAdmin}`, adminRoutes);	
app.use("/", clientRoutes);

app.listen(port, () => {
	console.log(`website is running on port ${port}`);
});
