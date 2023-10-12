import { PrismaClient, Services } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
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
    include:{
      user:true
    }
  });

  return result;
};

export const serviceServices = {
  createService,
};
