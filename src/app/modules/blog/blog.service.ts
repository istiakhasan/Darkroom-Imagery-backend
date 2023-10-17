import { Blog, Faqs, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';

const prisma = new PrismaClient();

const createBlog = async (data:Blog, user: JwtPayload | null) => {
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
    
    result = await prisma.blog.create({
      data: { ...data, autherEmail: user.email },
      include: {
        user: true,
      },
    });
  }
  return result;
};

const getAllBlogByAdminEmail = async (
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
      OR: ['title'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (user) {
    andConditons.push({ autherEmail: user.email });
  }
  const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};

  let result;
  if (user) {
    result = await prisma.blog.findMany({
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
  const total = await prisma.blog.count({
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

const updateBlog = async (
  user: JwtPayload | null,
  id: string,
  data: Partial<Faqs>
) => {
  let result;
  if (user) {
    result = await prisma.blog.update({
      data,
      where: {
        id: id,
        autherEmail: user.email,
      },
    });
  }

  return result;
};
const deleteBlog = async (user: JwtPayload | null, id: string) => {
  let result;
  if (user) {
    result = await prisma.blog.delete({
      where: {
        id: id,
        autherEmail: user.email,
      },
    });
  }

  return result;
};
const getAllBlogForUsers = async () => {
  const result = await prisma.blog.findMany({
    include:{
      user:true
    },
    orderBy:{createdAt: 'desc'}
  });

  return result;
};
export const blogService = {
  createBlog,
  getAllBlogByAdminEmail,
  updateBlog,
  deleteBlog,
  getAllBlogForUsers,
};
