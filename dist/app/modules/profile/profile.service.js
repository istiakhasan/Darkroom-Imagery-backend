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
exports.profileServices = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma = new client_1.PrismaClient();
const getProfileInfoByEmail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (user) {
        result = yield prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });
        if (!result) {
            throw new ApiError_1.default(400, 'User is not exist');
        }
    }
    return result;
});
const updateProfile = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (user) {
        result = yield prisma.user.update({
            data,
            where: {
                email: user.email,
            },
        });
    }
    return result;
});
exports.profileServices = {
    getProfileInfoByEmail,
    updateProfile
};
