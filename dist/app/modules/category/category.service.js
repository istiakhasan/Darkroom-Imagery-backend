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
exports.categoryService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma = new client_1.PrismaClient();
const createCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.create({
        data,
        include: {
            user: true,
        },
    });
    return result;
});
const getAllCategories = (user, filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters;
    const andConditons = [];
    if (searchTerm) {
        andConditons.push({
            OR: ['name'].map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (user) {
        andConditons.push({ userId: user.id });
    }
    const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
    let result;
    if (user) {
        result = yield prisma.category.findMany({
            skip,
            take: limit,
            where: whereConditons,
            orderBy: options.sortBy && options.sortOrder
                ? {
                    [options.sortBy]: options.sortOrder,
                }
                : {
                    createdAt: 'desc',
                },
        });
    }
    const total = yield prisma.category.count({
        where: whereConditons,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getCagegoryLabel = (option) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield prisma.category.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            Services: true
        }
    });
    if (option === null || option === void 0 ? void 0 : option.category) {
        return result;
    }
    else {
        return result.map(item => {
            return {
                label: item === null || item === void 0 ? void 0 : item.name,
                value: item === null || item === void 0 ? void 0 : item.id,
            };
        });
    }
});
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Category is not exist!');
    }
    return result;
});
const updateCategory = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.category.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Not exist ');
    }
    const result = yield prisma.category.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.category.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Data not exist');
    }
    const result = yield prisma.category.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.categoryService = {
    getSingleCategory,
    updateCategory,
    deleteCategory,
    createCategory,
    getAllCategories,
    getCagegoryLabel,
};
