import { Feedback, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
const prisma = new PrismaClient();
const createFeedback = async (data: Feedback, user: JwtPayload | null) => {
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
    result = await prisma.feedback.create({
      data: { ...data, userId: user.userId },
      include: {
        user: true,
      },
    });
  }
  return result;
};
const getAllFeedback = async () => {
  const  result = await prisma.feedback.findMany({
      include: {
        user: true,
      },
      orderBy:{
        createdAt:'desc'
      }
    });
  
  return result;
};

export const feedBackService = {
  createFeedback,
  getAllFeedback
};
