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
exports.serviceController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const services_service_1 = require("./services.service");
const createService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_service_1.serviceServices.createService(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Service created successfully!',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const updateServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_service_1.serviceServices.updateServices(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Service  updated successfully',
        data: result,
    });
}));
const getAllServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['searchTerm']);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield services_service_1.serviceServices.getAllServices(filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Service retrived successfully!',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const getAllServicesForUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, [
        'searchTerm',
        'minPrice',
        'maxPrice',
        'isAvailable',
        'status',
        'location',
        'categoryId',
    ]);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield services_service_1.serviceServices.getAllServicesForUsers(filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Service retrived successfully!',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const getSingleService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_service_1.serviceServices.getSingleService(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Servic retrived successfully!',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const deleteService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_service_1.serviceServices.deleteService(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Service deleted successfully!',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
exports.serviceController = {
    getAllServices,
    createService,
    getSingleService,
    getAllServicesForUsers,
    updateServices,
    deleteService
};
