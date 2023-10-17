import { PrismaClient, User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
const prisma = new PrismaClient();
const getProfileInfoByEmail = async (user: JwtPayload | null) => {
  let result;
  if (user) {
    result = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!result) {
      throw new ApiError(400, 'User is not exist');
    }
  }

  return result;
};
const updateProfile = async (
    user: JwtPayload | null,
    data: Partial<User>
  ) => {
    let result;
    if (user) {
      result = await prisma.user.update({
        data,
        where: {
          email: user.email,
        },
      });
    }
  
    return result;
  };

export const profileServices={
    getProfileInfoByEmail,
    updateProfile
}
