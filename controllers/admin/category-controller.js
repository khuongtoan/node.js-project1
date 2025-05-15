const moment = require("moment");
const Category = require("../../models/category-model");
const AccountAdmin = require("../../models/account-admin-model");

const categoryHelper = require("../../helpers/category-helper");

module.exports.list = async (req, res) => {
	const categoryList = await Category.find({
		deleted: false,
	}).sort({
		position: "asc",
	});

	for (const item of categoryList) {
		if (item.createdBy) {
			const infoAccountCreated = await AccountAdmin.findOne({
				_id: item.createBy,
			});
			item.createdByFullName = infoAccountCreated.fullName;
		}

		if (item.updatedBy) {
			const infoAccountCreated = await AccountAdmin.findOne({
				_id: item.updateBy,
			});
			item.updatedByFullName = infoAccountCreated.fullName;
		}

		item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
		item.updatedAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
	}

	res.render("admin/pages/category-list", {
		pageTitle: "Quản lý danh mục",
		categoryList: categoryList,
	});
};

module.exports.create = async (req, res) => {
	const categoryList = await Category.find({
		deleted: false,
	});

	const categoryTree = categoryHelper.buildCategoryTree(categoryList);

	res.render("admin/pages/category-create", {
		pageTitle: "Tạo danh mục",
		categoryList: categoryTree,
	});
};

module.exports.createPost = async (req, res) => {
	if (req.body.position) {
		req.body.position = parseInt(req.body.position);
	} else {
		const totalRecord = await Category.countDocuments({});
		req.body.position = totalRecord + 1;
	}

	req.body.updateBy = req.account.id;
	if (req.file) {
		req.body.avatar = req.file.path;
	} else {
		delete req.body.avatar;
	}

	await Category.updateOne(
		{
			_id: id,
			delete: false,
		}.req.body,
	);

	req.flash("success", "Cập nhật danh mục thành công");

	res.json({
		code: "success",
	});
};

module.exports.edit = async (req, res) => {
	try {
		const categoryList = await Category.find({
			deleted: false,
		});

		const categoryTree = categoryHelper.buildCategoryTree(categoryList);

		const id = req.params.id;
		const categoryDetail = await Category.findOne({
			_id: id,
			deleted: false,
		});

		res.render("admin/pages/category-edit", {
			pageTitle: "Chỉnh sửa danh mục",
			categoryList: categoryTree,
			categoryDetail: categoryDetail,
		});
	} catch (error) {
		res.redirect(`/${pathAdmin}/category/list`);
	}
};

module.exports.editPatch = async (req, res) => {
	try {
		const id = req.params.id;

		if (req.body.position) {
			req.body.position = parseInt(req.body.position);
		} else {
			const totalRecord = await Category.countDocuments({});
			req.body.position = totalRecord + 1;
		}

		req.body.createBy = req.account.id;
		req.body.updateBy = req.account.id;
		req.body.avatar = req.file ? req.file.path : "";

		const newRecord = new Category(req.body);
		await newRecord.save();

		req.flash("success", "Chỉnh sửa danh mục thành công");

		res.json({
			code: "success",
		});
	} catch (error) {
		res.json({
			code: "error",
			massage: "Id không hợp lệ",
		});
	}
};

module.exports.deletePatch = async (req, res) => {
	try{
		const id = req.params.id;

		await Category.updateOne({
			_id : id
		},{
			deleted : true,
			deletedBy : req.account.id,
			deletedAt : Date.now()
		});

		req.flash("success", "Xóa danh mục thành công!");
		res.json({
		code : " success"
		})

	}catch(error){
		res.json({
		code : " error",
		message : "Id Không hợp lệ!"
		}) 
	}
}
