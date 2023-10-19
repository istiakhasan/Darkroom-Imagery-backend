"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const user_1 = require("../../../enums/user");
const FileUploadHelpers_1 = require("../../../helpers/FileUploadHelpers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const category_controller_1 = require("./category.controller");
const categoryValidation_1 = require("./categoryValidation");
const categoryZod = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Title is required" })
    })
});
const router = express_1.default.Router();
router.post('/create-category', FileUploadHelpers_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = categoryValidation_1.categorySchema.createCategorySchema.parse(JSON.parse(req.body.data));
    return category_controller_1.categoryController.createCategory(req, res, next);
});
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.categoryController.getAllCategories);
router.get('/all', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.categoryController.getCagegoryLabel);
router.get('/:id', category_controller_1.categoryController.getSingleCategory);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.categoryController.updateCategory);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.categoryController.deleteCategory);
exports.categoryRouter = router;
