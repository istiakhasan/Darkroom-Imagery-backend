import { Category, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';

const prisma = new PrismaClient();

const createCategory = async (data: Category): Promise<Category> => {
  console.log(data, 'data');
  const result = await prisma.category.create({
    data,
    include: {
      user: true,
    },
  });
  return result;
};

const getAllCategories = async (
  user: JwtPayload | null,
  filters: {
    searchTerm?: string;
  },
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
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
    result = await prisma.category.findMany({
      skip,
      take: limit,
      where: whereConditons,
      orderBy:
        options.sortBy && options.sortOrder
          ? {
              [options.sortBy]: options.sortOrder,
            }
          : {
              createdAt: 'desc',
            },
    });
  }
  const total = await prisma.category.count({
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
const getCagegoryLabel = async (option: { category?: string }) => {
  let result = await prisma.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include:{
      Services:true
    }
  });
  if (option?.category) {
    return result;
  } else {
    return result.map(item => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });
  }
};
const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category is not exist!');
  }
  return result;
};
const updateCategory = async (
  id: string,
  data: Partial<Category>
): Promise<Category | null> => {
  const isExist = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not exist ');
  }
  const result = await prisma.category.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
const deleteCategory = async (id: string): Promise<Category | null> => {
  const isExist = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not exist');
  }
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const categoryService = {
  getSingleCategory,
  updateCategory,
  deleteCategory,
  createCategory,
  getAllCategories,
  getCagegoryLabel,
};
