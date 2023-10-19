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
exports.blogService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma = new client_1.PrismaClient();
const createBlog = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (user) {
        const isExist = yield prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });
        if (!isExist) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User is not exist');
        }
        result = yield prisma.blog.create({
            data: Object.assign(Object.assign({}, data), { autherEmail: user.email }),
            include: {
                user: true,
            },
        });
    }
    return result;
});
const getAllBlogByAdminEmail = (user, filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters;
    const andConditons = [];
    if (searchTerm) {
        andConditons.push({
            OR: ['title'].map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (user) {
        andConditons.push({ autherEmail: user.email });
    }
    const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
    let result;
    if (user) {
        result = yield prisma.blog.findMany({
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
    const total = yield prisma.blog.count({
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
const updateBlog = (user, id, data) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (user) {
        result = yield prisma.blog.update({
            data,
            where: {
                id: id,
                autherEmail: user.email,
            },
        });
    }
    return result;
});
const deleteBlog = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (user) {
        result = yield prisma.blog.delete({
            where: {
                id: id,
                autherEmail: user.email,
            },
        });
    }
    return result;
});
const getAllBlogForUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.blog.findMany({
        include: {
            user: true
        },
        orderBy: { createdAt: 'desc' }
    });
    return result;
});
exports.blogService = {
    createBlog,
    getAllBlogByAdminEmail,
    updateBlog,
    deleteBlog,
    getAllBlogForUsers,
};
