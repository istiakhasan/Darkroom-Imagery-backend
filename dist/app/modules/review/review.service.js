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
exports.reviewService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma = new client_1.PrismaClient();
const createReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma.user.findUnique({
        where: {
            email: data === null || data === void 0 ? void 0 : data.userEmail,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User name is not exist');
    }
    const result = yield prisma.reviewAndRating.create({
        data,
        include: {
            user: true,
        },
    });
    return result;
});
const getReview = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.reviewAndRating.findMany({
        include: {
            user: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
});
// const getAllServices = async (
//   filters: {
//     searchTerm?: string;
//   },
//   options: IPaginationOptions
// ): Promise<IGenericResponse<Services[]>> => {
//   const { page, limit, skip } = paginationHelpers.calculatePagination(options);
//   const { searchTerm } = filters;
//   const andConditons = [];
//   if (searchTerm) {
//     andConditons.push({
//       OR: ['serviceName'].map(field => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive',
//         },
//       })),
//     });
//   }
//   const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
//   const result = await prisma.services.findMany({
//     skip,
//     take: limit,
//     where: whereConditons,
//     include: {
//       user: true,
//     },
//     orderBy:
//       options.sortBy && options.sortOrder
//         ? {
//             [options.sortBy]: options.sortOrder,
//           }
//         : {
//             createdAt: 'desc',
//           },
//   });
//   const total = await prisma.services.count({
//     where: whereConditons,
//   });
//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };
// const getAllServicesForUsers = async (
//   filters: {
//     searchTerm?: string;
//     minPrice?: number;
//     maxPrice?: number;
//     isAvailable?: string;
//     status?: string;
//     location?:string;
//     categoryId?:string
//   },
//   options: IPaginationOptions
// ): Promise<IGenericResponse<Services[]>> => {
//   const { page, limit, skip } = paginationHelpers.calculatePagination(options);
//   const { searchTerm, minPrice, maxPrice, isAvailable, status,location,categoryId } = filters;
//   console.log(categoryId);
//   const andConditons = [];
//   if (isAvailable) {
//     andConditons.push({
//       OR: [
//         { status: ServiceStatusEnum.hot },
//         { status: ServiceStatusEnum.tranding },
//       ],
//     });
//   }
//   if (status) {
//     andConditons.push({
//       status: ServiceStatusEnum.upcomming,
//     });
//   }
//   if (categoryId) {
//     andConditons.push({
//       categoryId: categoryId,
//     });
//   }
//   if(location){
//     andConditons.push({
//       location:location
//     })
//   }
//   if (isAvailable) {
//     andConditons.push({
//       OR: [
//         { status: ServiceStatusEnum.hot },
//         { status: ServiceStatusEnum.tranding },
//       ],
//     });
//   }
//   if (minPrice) {
//     andConditons.push({
//       price: {
//         gte: Number(minPrice),
//       },
//     });
//   }
//   if (maxPrice) {
//     andConditons.push({
//       price: {
//         lte: Number(maxPrice),
//       },
//     });
//   }
//   if (searchTerm) {
//     andConditons.push({
//       OR: [...['serviceName','location','categoryId'].map(field => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive',
//         },
//       })), {
//         category: {
//           name: {
//             contains: searchTerm,
//             mode: 'insensitive',
//           },
//         },
//       },],
//     });
//   }
//   const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
//   const result = await prisma.services.findMany({
//     skip,
//     take: limit,
//     // @ts-ignore
//     where: whereConditons,
//     include: {
//       user: true,
//       category:true
//     },
//     orderBy:
//       options.sortBy && options.sortOrder
//         ? {
//             [options.sortBy]: options.sortOrder,
//           }
//         : {
//             createdAt: 'desc',
//           },
//   });
//   const total = await prisma.services.count({
//     // @ts-ignore
//     where: whereConditons,
//   });
//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };
// const getSingleService = async (id: string) => {
//   const result = await prisma.services.findUnique({
//     where: {
//       id: id,
//     },
//     include: {
//       user: true,
//       Slots: true,
//       ReviewAndRating: true,
//     },
//   });
//   return result;
// };
exports.reviewService = {
    createReview,
    getReview,
};
