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
exports.SignUpService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma = new client_1.PrismaClient();
const signUp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.role) {
        data.role = "user";
    }
    const isUserExist = yield prisma.user.findFirst({
        where: {
            email: data.email,
        },
    });
    if (isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User already exist');
    }
    const result = yield prisma.user.create({
        data,
    });
    return result;
});
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma.user.findUnique({
        where: {
            email: data === null || data === void 0 ? void 0 : data.email,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const { id: userId, email, password: savePassword, role } = isUserExist;
    if (data.password !== savePassword) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, email }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return { accessToken, refreshToken };
});
// get all users
const getAllUsers = (user, filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, role } = filters;
    const andConditons = [];
    if (searchTerm) {
        andConditons.push({
            OR: ['name', 'email', 'contactNo'].map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (role) {
        andConditons.push({ role: role });
    }
    if (user) {
        if ((user === null || user === void 0 ? void 0 : user.role) === client_1.RoleEnum.admin) {
            andConditons.push({ role: client_1.RoleEnum.user });
        }
        // if(user?.role===RoleEnum.super_admin){
        //   andConditons.push({})
        // }
    }
    const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
    const result = yield prisma.user.findMany({
        skip,
        take: limit,
        where: whereConditons,
        // where: {
        //   AND: [whereConditons, { role: RoleEnum.user }],
        // },
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma.user.count({
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
const deleteUsers = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.delete({
        where: {
            id: id,
        },
    });
    return result;
});
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.update({
        where: {
            id: id,
        },
        data
    });
    return result;
});
exports.SignUpService = {
    signUp,
    login,
    getAllUsers,
    deleteUsers,
    updateUser
};
