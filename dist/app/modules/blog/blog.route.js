"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const FileUploadHelpers_1 = require("../../../helpers/FileUploadHelpers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const blog_controller_1 = require("./blog.controller");
const blog_validaton_1 = require("./blog.validaton");
const router = express_1.default.Router();
router.post('/', FileUploadHelpers_1.FileUploadHelper.upload.single('file'), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (req, res, next) => {
    req.body = blog_validaton_1.blogValidation.createBlogValidationSchema.parse(JSON.parse(req.body.data));
    return blog_controller_1.blogController.careteBlog(req, res, next);
});
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), blog_controller_1.blogController.getAllBlogByAdminEmail);
router.get('/get-all', blog_controller_1.blogController.getAllBlogForUsers);
router.patch('/:id', FileUploadHelpers_1.FileUploadHelper.upload.single('file'), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (req, res, next) => {
    req.body = blog_validaton_1.blogValidation.updateBlogValidationSchema.parse(JSON.parse(req.body.data));
    return blog_controller_1.blogController.updateBlog(req, res, next);
});
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), blog_controller_1.blogController.deleteBlog);
exports.blogRouter = router;
