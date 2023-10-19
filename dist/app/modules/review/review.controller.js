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
exports.reviewController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const review_service_1 = require("./review.service");
const createReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_service_1.reviewService.createReview(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Service created successfully!',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const getReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_service_1.reviewService.getReview();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Service retrived successfully!',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
// const getAllServicesForUsers = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, ['searchTerm','minPrice','maxPrice','isAvailable','status','location','categoryId']);
//   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
//   const result = await serviceServices.getAllServicesForUsers(filters,options);
//   sendResponse(res, {
//     success: true,
//     message: 'Service retrived successfully!',
//     statusCode: httpStatus.OK,
//     data: result,
//   });
// });
// const getSingleService = catchAsync(async (req: Request, res: Response) => {
//   const result = await serviceServices.getSingleService(req.params.id);
//   sendResponse(res, {
//     success: true,
//     message: 'Servic retrived successfully!',
//     statusCode: httpStatus.OK,
//     data: result,
//   });
// });
exports.reviewController = {
    createReview,
    getReview
};
