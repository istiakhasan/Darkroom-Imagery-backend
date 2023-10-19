import { PrismaClient, ServiceStatusEnum, Services } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
const prisma = new PrismaClient();

const createService = async (data: Services): Promise<Services> => {
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
    location?: string;
    categoryId?: string;
  },
  options: IPaginationOptions
): Promise<IGenericResponse<Services[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const {
    searchTerm,
    minPrice,
    maxPrice,
    isAvailable,
    status,
    location,
    categoryId,
  } = filters;

  const andConditons = [];
  if (isAvailable) {
    andConditons.push({
      OR: [
        { status: ServiceStatusEnum.hot },
        { status: ServiceStatusEnum.tranding },
      ],
    });
  }
  if (status) {
    andConditons.push({
      status: ServiceStatusEnum.upcomming,
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

  const result = await prisma.services.findMany({
    skip,
    take: limit,
    // @ts-ignore
    where: whereConditons,
    include: {
      user: true,
      category: true,
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
};

const getSingleService = async (id: string) => {
  const result = await prisma.services.findUnique({
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
};

const updateServices = async (id: string, data: Partial<Services>) => {
  const result = await prisma.services.update({
    data,
    where: {
      id: id,
    },
  });

  return result;
};
const deleteService = async (id: string) => {
  const result = await prisma.services.delete({
    where: {
      id: id,
    },
  });

  return result;
};

export const serviceServices = {
  createService,
  getAllServices,
  getSingleService,
  getAllServicesForUsers,
  updateServices,
  deleteService,
};
