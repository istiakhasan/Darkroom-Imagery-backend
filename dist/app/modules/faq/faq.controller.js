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
exports.faqController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const faq_service_1 = require("./faq.service");
const careteFaq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faq_service_1.faqService.createFaq(req.body, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Faq created successfully',
        data: result,
    });
}));
const getFaq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['searchTerm']);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield faq_service_1.faqService.getAllFaq(req.user, filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Faq retrived successfully',
        data: result,
    });
}));
const updateFaq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faq_service_1.faqService.updateFaq(req.user, req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Faq updated successfully',
        data: result,
    });
}));
const deleteFaq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faq_service_1.faqService.deleteFaq(req.user, req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Faq Deleted successfully',
        data: result,
    });
}));
const getAll = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faq_service_1.faqService.getAll();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Faq Retrived successfully',
        data: result,
    });
}));
exports.faqController = {
    careteFaq,
    getFaq,
    updateFaq,
    deleteFaq,
    getAll
};
