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
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const blog_service_1 = require("./blog.service");
const careteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const data = JSON.parse(req.body.data);
    // @ts-ignore
    const base64Data = (_c = (_b = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.file) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.toString('base64');
    if (base64Data) {
        // @ts-ignore
        data["image"] = `data:${(_e = (_d = req === null || req === void 0 ? void 0 : req.files) === null || _d === void 0 ? void 0 : _d.file) === null || _e === void 0 ? void 0 : _e.mimetype};base64,` + base64Data;
    }
    else {
        data.image = '';
    }
    const result = yield blog_service_1.blogService.createBlog(data, req.user);
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
    var _f, _g, _h, _j, _k;
    const data = JSON.parse(req.body.data);
    // @ts-ignore
    const base64Data = (_h = (_g = (_f = req === null || req === void 0 ? void 0 : req.files) === null || _f === void 0 ? void 0 : _f.file) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.toString('base64');
    if (base64Data) {
        // @ts-ignore
        data["image"] = `data:${(_k = (_j = req === null || req === void 0 ? void 0 : req.files) === null || _j === void 0 ? void 0 : _j.file) === null || _k === void 0 ? void 0 : _k.mimetype};base64,` + base64Data;
    }
    else {
        data.image = '';
    }
    const result = yield blog_service_1.blogService.updateBlog(req.user, req.params.id, data);
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
