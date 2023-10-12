import { PrismaClient, User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

export type ILoginUser = {
  email: string;
  password: string;
};
const prisma = new PrismaClient();

const signUp = async (data: User): Promise<User> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: data.email,
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
  const { password, email } = data;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const { id: userId, password: savePassword, role } = isUserExist;
  if (password !== savePassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const a = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
  // console.log(a,"asdfasdf");
  console.log(a);
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return { accessToken, refreshToken };
};

export const SignUpService = {
  signUp,
  login,
};
