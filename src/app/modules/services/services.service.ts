import { PrismaClient, ServiceStatusEnum, Services } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
const prisma = new PrismaClient();

const createService = async (data: Services): Promise<Services> => {
  console.log(data, 'data');
  // return
  const isUserExist = await prisma.services.findFirst({
    where: {
      serviceName: data.serviceName,
    },
  });

  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service Name exist');
  }
  const result = await prisma.services.create({
    data,
    include: {
      user: true,
    },
  });

  return result;
};

const getAllServices = async (
  filters: {
    searchTerm?: string;
  },
  options: IPaginationOptions
): Promise<IGenericResponse<Services[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
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

  const result = await prisma.services.findMany({
    skip,
    take: limit,
    where: whereConditons,
    include: {
      user: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.services.count({
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
};
const getAllServicesForUsers = async (
  filters: {
    searchTerm?: string;
    minPrice?: number;
    maxPrice?: number;
    isAvailable?: string;
    status?: string;
  },
  options: IPaginationOptions
): Promise<IGenericResponse<Services[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, minPrice, maxPrice, isAvailable, status } = filters;
  console.log(minPrice, maxPrice);

  const andConditons = [];
  console.log(isAvailable, 'available');
  if (isAvailable) {
    andConditons.push({
      OR: [
        { status: ServiceStatusEnum.hot },
        { status: ServiceStatusEnum.tranding },
      ],
    });
  }
  console.log(status,"status");
  if (status) {
    andConditons.push({
      status: ServiceStatusEnum.upcomming,
    });
  }
  if (isAvailable) {
    andConditons.push({
      OR: [
        { status: ServiceStatusEnum.hot },
        { status: ServiceStatusEnum.tranding },
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
      OR: ['serviceName'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.services.findMany({
    skip,
    take: limit,
    where: whereConditons,
    include: {
      user: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.services.count({
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
};

const getSingleService = async (id: string) => {
  const result = await prisma.services.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      Slots: true,
      ReviewAndRating: true,
    },
  });

  return result;
};

export const serviceServices = {
  createService,
  getAllServices,
  getSingleService,
  getAllServicesForUsers,
};
