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
exports.userService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma = new client_1.PrismaClient();
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findMany();
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User is not exist!');
    }
    return result;
});
const updateSingleUsers = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.user.findUnique({
        where: {
            id
        }
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User is not exist');
    }
    const result = yield prisma.user.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.user.findUnique({
        where: {
            id
        }
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User is not exist');
    }
    const result = yield prisma.user.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.userService = {
    getAllUsers,
    getSingleUser,
    updateSingleUsers,
    deleteSingleUser,
};
