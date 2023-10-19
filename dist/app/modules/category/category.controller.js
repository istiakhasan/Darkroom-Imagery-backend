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
exports.categoryController = void 0;
const FileUploadHelpers_1 = require("../../../helpers/FileUploadHelpers");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const category_service_1 = require("./category.service");
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    let uploadImage;
    if (file) {
        uploadImage = yield FileUploadHelpers_1.FileUploadHelper.uploadCloudinary(file);
    }
    if (uploadImage) {
        req.body.image = uploadImage === null || uploadImage === void 0 ? void 0 : uploadImage.secure_url;
    }
    const result = yield category_service_1.categoryService.createCategory(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Category created successfully',
        data: result,
    });
}));
const getAllCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['searchTerm']);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield category_service_1.categoryService.getAllCategories(req.user, filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Categories fetched successfully',
        data: result,
    });
}));
const getCagegoryLabel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(req.query, ['category']);
    const result = yield category_service_1.categoryService.getCagegoryLabel(options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Categories fetched successfully',
        data: result,
    });
}));
const getSingleCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.categoryService.getSingleCategory(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Category fetched successfully',
        data: result,
    });
}));
const updateCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.categoryService.updateCategory(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Category updated successfully',
        data: result,
    });
}));
const deleteCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.categoryService.deleteCategory(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Category deleted successfully',
        data: result,
    });
}));
exports.categoryController = {
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
    createCategory,
    getCagegoryLabel
};
