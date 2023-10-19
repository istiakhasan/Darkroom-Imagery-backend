import { PrismaClient, RoleEnum, User } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';

export type ILoginUser = {
  email: string | undefined;
  password: string;
};
const prisma = new PrismaClient();

const signUp = async (data: User): Promise<User> => {

   if(!data.role){
       data.role="user"
   }
  
  const isUserExist = await prisma.user.findFirst({
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
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: data?.email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const { id: userId, email, password: savePassword, role } = isUserExist;
  if (data.password !== savePassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const accessToken = jwtHelpers.createToken(
    { userId, role, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { userId, role, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return { accessToken, refreshToken };
};

// get all users
const getAllUsers = async (
  user:JwtPayload | null,
  filters: {
    searchTerm?: string;
    role?:string
  },
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm,role } = filters;
  const andConditons = [];
  if (searchTerm) {
    andConditons.push({
      OR: ['name', 'email', 'contactNo'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if(role){
    andConditons.push({role:(role as RoleEnum)})
  }
  if(user){

      if(user?.role===RoleEnum.admin){
        andConditons.push({role:RoleEnum.user})
      }

      // if(user?.role===RoleEnum.super_admin){
      //   andConditons.push({})
      // }
  }

  const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.user.findMany({
    skip,
    take: limit,
    where: whereConditons,
    // where: {
    //   AND: [whereConditons, { role: RoleEnum.user }],
    // },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.user.count({
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

const deleteUsers = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return result;
};
const updateUser = async (id: string,data:Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data
  });
  return result;
};

export const SignUpService = {
  signUp,
  login,
  getAllUsers,
  deleteUsers,
  updateUser
};
