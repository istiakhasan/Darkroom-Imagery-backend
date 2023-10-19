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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookedService = void 0;
const client_1 = require("@prisma/client");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma = new client_1.PrismaClient();
const createBookedService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // const results = await Promise.all(
    //   data.map(async (element) => {
    //     const item = await prisma.bookedService.create({
    //       data: element,
    //     });
    //     return item;
    //   })
    // );
    const results = yield prisma.bookedService.create({
        data: Object.assign(Object.assign({}, data), { isCancel: false }),
    });
    return results;
});
// get all booking by email
const getByEmail = (user, filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters;
    const andConditons = [];
    if (searchTerm) {
        andConditons.push({
            OR: [
                ...['startTime', 'endTime', 'location'].map(field => ({
                    [field]: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                })),
                {
                    service: {
                        serviceName: {
                            contains: searchTerm,
                            mode: 'insensitive',
                        },
                    },
                },
            ],
        });
    }
    if (user && (user === null || user === void 0 ? void 0 : user.role) === "user") {
        andConditons.push({ userEmail: user.email });
    }
    // if (user && user?.role==="admin") {
    //   andConditons.push({ userEmail: user.email });
    // }
    const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
    let result;
    if (user) {
        result = yield prisma.bookedService.findMany({
            skip,
            take: limit,
            //@ts-ignore
            where: whereConditons,
            orderBy: options.sortBy && options.sortOrder
                ? {
                    [options.sortBy]: options.sortOrder,
                }
                : {
                    createdAt: 'desc',
                },
            include: {
                user: true,
                service: true,
            },
        });
    }
    const total = yield prisma.bookedService.count({
        //@ts-ignore
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
const manageBooking = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.bookedService.update({
        where: {
            id: id
        },
        data
    });
    return result;
});
exports.bookedService = {
    createBookedService,
    getByEmail,
    manageBooking
};
