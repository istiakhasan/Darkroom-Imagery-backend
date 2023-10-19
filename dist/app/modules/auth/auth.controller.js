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
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const auth_service_1 = require("./auth.service");
const signUP = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const data = JSON.parse(req.body.data);
    // @ts-ignore
    const base64Data = (_c = (_b = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.file) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.toString('base64');
    if (base64Data) {
        // @ts-ignore
        data["profileImg"] = `data:${(_e = (_d = req === null || req === void 0 ? void 0 : req.files) === null || _d === void 0 ? void 0 : _d.file) === null || _e === void 0 ? void 0 : _e.mimetype};base64,` + base64Data;
    }
    else {
        data.profileImg = '';
    }
    const result = yield auth_service_1.SignUpService.signUp(data);
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
    var _f, _g, _h, _j, _k, _l;
    const data = JSON.parse((_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.data);
    // @ts-ignore
    const base64Data = (_j = (_h = (_g = req === null || req === void 0 ? void 0 : req.files) === null || _g === void 0 ? void 0 : _g.file) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.toString('base64');
    if (base64Data) {
        // @ts-ignore
        data["profileImg"] = `data:${(_l = (_k = req === null || req === void 0 ? void 0 : req.files) === null || _k === void 0 ? void 0 : _k.file) === null || _l === void 0 ? void 0 : _l.mimetype};base64,` + base64Data;
    }
    else {
        data.profileImg = '';
    }
    const result = yield auth_service_1.SignUpService.updateUser(req.params.id, data);
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
