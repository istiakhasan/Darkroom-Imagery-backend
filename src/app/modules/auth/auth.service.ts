import { PrismaClient, User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

export type ILoginUser = {
  email: string | undefined;
  password: string;
};
const prisma = new PrismaClient();

const signUp = async (data: User): Promise<User> => {



  const isUserExist = await prisma.user.findFirst({
    where: {
      contactNo: data.contactNo,
    },
  });

  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exist');
  }
  const result = await prisma.user.create({
    data,
  });

  return result;
};
const login = async (data: ILoginUser) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: data?.email,
    },
  });
  console.log(isUserExist,"user");

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const { id: userId,email, password: savePassword, role } = isUserExist;
  if (data.password !== savePassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const accessToken = jwtHelpers.createToken(
    { userId, role,email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { userId, role,email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return { accessToken, refreshToken };
};

export const SignUpService = {
  signUp,
  login,
};
