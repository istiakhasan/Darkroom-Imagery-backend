import { PrismaClient, User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const prisma = new PrismaClient();

const getAllUsers = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();
  return result;
};
const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User is not exist!');
  }
  return result;
};
const updateSingleUsers = async (
  id: string,
  data: Partial<User>
): Promise<User | null> => {
  const isExist=await prisma.user.findUnique({
    where:{
      id
    }
  })
  if(!isExist){
    throw new ApiError(httpStatus.NOT_FOUND,'User is not exist')
  }
  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
const deleteSingleUser = async (id: string): Promise<User | null> => {
  const isExist=await prisma.user.findUnique({
    where:{
      id
    }
  })
  if(!isExist){
    throw new ApiError(httpStatus.NOT_FOUND,'User is not exist')
  }
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const userService = {
  getAllUsers,
  getSingleUser,
  updateSingleUsers,
  deleteSingleUser,
};
