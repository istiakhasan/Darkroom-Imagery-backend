"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = void 0;
const FileUploadHelpers_1 = require("../../../helpers/FileUploadHelpers");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const blog_service_1 = require("./blog.service");
const careteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const uploadImage = yield FileUploadHelpers_1.FileUploadHelper.uploadCloudinary(file);
    if (uploadImage) {
        req.body.image = uploadImage === null || uploadImage === void 0 ? void 0 : uploadImage.secure_url;
    }
    const result = yield blog_service_1.blogService.createBlog(req.body, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Blog created successfully',
        data: result,
    });
}));
const getAllBlogByAdminEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['searchTerm']);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield blog_service_1.blogService.getAllBlogByAdminEmail(req.user, filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Faq retrived successfully',
        data: result,
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    let uploadImage;
    if (file) {
        uploadImage = yield FileUploadHelpers_1.FileUploadHelper.uploadCloudinary(file);
    }
    if (uploadImage) {
        req.body.image = uploadImage === null || uploadImage === void 0 ? void 0 : uploadImage.secure_url;
    }
    const result = yield blog_service_1.blogService.updateBlog(req.user, req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Faq updated successfully',
        data: result,
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blogService.deleteBlog(req.user, req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Blog Deleted successfully',
        data: result,
    });
}));
const getAllBlogForUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blogService.getAllBlogForUsers();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Blog Retrived successfully',
        data: result,
    });
}));
exports.blogController = {
    careteBlog,
    getAllBlogByAdminEmail,
    deleteBlog,
    updateBlog,
    getAllBlogForUsers
};
