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
exports.serviceServices = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma = new client_1.PrismaClient();
const createService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma.services.findFirst({
        where: {
            serviceName: data.serviceName,
        },
    });
    if (isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Service Name exist');
    }
    const result = yield prisma.services.create({
        data,
        include: {
            user: true,
        },
    });
    return result;
});
const getAllServices = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters;
    const andConditons = [];
    if (searchTerm) {
        andConditons.push({
            OR: ['serviceName'].map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
    const result = yield prisma.services.findMany({
        skip,
        take: limit,
        where: whereConditons,
        include: {
            user: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma.services.count({
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
const getAllServicesForUsers = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, minPrice, maxPrice, isAvailable, status, location, categoryId, } = filters;
    const andConditons = [];
    if (isAvailable) {
        andConditons.push({
            OR: [
                { status: client_1.ServiceStatusEnum.hot },
                { status: client_1.ServiceStatusEnum.tranding },
            ],
        });
    }
    if (status) {
        andConditons.push({
            status: client_1.ServiceStatusEnum.upcomming,
        });
    }
    if (categoryId) {
        andConditons.push({
            categoryId: categoryId,
        });
    }
    if (location) {
        andConditons.push({
            location: location,
        });
    }
    if (isAvailable) {
        andConditons.push({
            OR: [
                { status: client_1.ServiceStatusEnum.hot },
                { status: client_1.ServiceStatusEnum.tranding },
            ],
        });
    }
    if (minPrice) {
        andConditons.push({
            price: {
                gte: Number(minPrice),
            },
        });
    }
    if (maxPrice) {
        andConditons.push({
            price: {
                lte: Number(maxPrice),
            },
        });
    }
    if (searchTerm) {
        andConditons.push({
            OR: [
                ...['serviceName', 'location', 'categoryId'].map(field => ({
                    [field]: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                })),
                {
                    category: {
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive',
                        },
                    },
                },
            ],
        });
    }
    const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
    const result = yield prisma.services.findMany({
        skip,
        take: limit,
        // @ts-ignore
        where: whereConditons,
        include: {
            user: true,
            category: {
                select: {
                    image: false,
                    name: true,
                    id: true,
                    Services: false,
                }
            },
        },
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma.services.count({
        // @ts-ignore
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
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.services.findUnique({
        where: {
            id: id,
        },
        include: {
            user: true,
            Slots: true,
            ReviewAndRating: {
                include: {
                    user: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            },
        },
    });
    return result;
});
const updateServices = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.services.update({
        data,
        where: {
            id: id,
        },
    });
    return result;
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.services.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.serviceServices = {
    createService,
    getAllServices,
    getSingleService,
    getAllServicesForUsers,
    updateServices,
    deleteService,
};
