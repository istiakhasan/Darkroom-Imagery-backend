import { Faqs, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';

const prisma = new PrismaClient();

const createFaq = async (data: Faqs, user: JwtPayload | null) => {
  let result;
  if (user) {
    const isExist = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User is not exist');
    }
    result = await prisma.faqs.create({
      data: { ...data, userEmail: user.email },
      include: {
        user: true,
      },
    });
  }
  return result;
};

const getAllFaq = async (
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
      OR: ['question'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (user) {
    andConditons.push({ userEmail: user.email });
  }
  const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};

  let result;
  if (user) {
    result = await prisma.faqs.findMany({
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
  const total = await prisma.faqs.count({
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

const updateFaq = async (
  user: JwtPayload | null,
  id: string,
  data: Partial<Faqs>
) => {
  let result;
  if (user) {
    result = await prisma.faqs.update({
      data,
      where: {
        id: id,
        userEmail: user.email,
      },
    });
  }

  return result;
};
const deleteFaq = async (user: JwtPayload | null, id: string) => {
  let result;
  if (user) {
    result = await prisma.faqs.delete({
      where: {
        id: id,
        userEmail: user.email,
      },
    });
  }

  return result;
};
const getAll = async () => {
  const result = await prisma.faqs.findMany();

  return result;
};
export const faqService = {
  createFaq,
  getAllFaq,
  updateFaq,
  deleteFaq,
  getAll,
};
