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
exports.signUpController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const FileUploadHelpers_1 = require("../../../helpers/FileUploadHelpers");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const auth_service_1 = require("./auth.service");
const signUP = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const uploadImage = yield FileUploadHelpers_1.FileUploadHelper.uploadCloudinary(file);
    if (uploadImage) {
        req.body.profileImg = uploadImage === null || uploadImage === void 0 ? void 0 : uploadImage.secure_url;
    }
    const result = yield auth_service_1.SignUpService.signUp(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'User created successfully!',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const logIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.SignUpService.login(req.body);
    const { refreshToken, accessToken } = result;
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User signin successfully!',
        token: accessToken,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['searchTerm', 'role']);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield auth_service_1.SignUpService.getAllUsers(req.user, filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User retrived successfully!',
        data: result,
    });
}));
const deleteUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.SignUpService.deleteUsers(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User Deleted successfully!',
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    let uploadImage;
    if (file) {
        uploadImage = yield FileUploadHelpers_1.FileUploadHelper.uploadCloudinary(file);
    }
    if (uploadImage) {
        req.body.profileImg = uploadImage === null || uploadImage === void 0 ? void 0 : uploadImage.secure_url;
    }
    const result = yield auth_service_1.SignUpService.updateUser(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User Deleted successfully!',
        data: result,
    });
}));
exports.signUpController = {
    signUP,
    logIn,
    getAllUsers,
    deleteUsers,
    updateUser
};
