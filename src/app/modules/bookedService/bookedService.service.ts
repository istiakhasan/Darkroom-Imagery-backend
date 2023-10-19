import { BookedService, PrismaClient } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';

const prisma = new PrismaClient();

const createBookedService = async (data: BookedService) => {
  // const results = await Promise.all(
  //   data.map(async (element) => {
  //     const item = await prisma.bookedService.create({
  //       data: element,
  //     });
  //     return item;
  //   })
  // );
  const results = await prisma.bookedService.create({
    data: {...data,isCancel:false},
  });

  return results;
};

// get all booking by email
const getByEmail = async (
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
      OR: [
        ...['startTime', 'endTime','location'].map(field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
        {
          service: {
            serviceName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
      ],
    });
  }
  if (user && user?.role==="user") {
    andConditons.push({ userEmail: user.email });
  }
  // if (user && user?.role==="admin") {
  //   andConditons.push({ userEmail: user.email });
  // }
  const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};

  let result;
  if (user) {
    result = await prisma.bookedService.findMany({
      skip,
      take: limit,
      //@ts-ignore
      where: whereConditons,
      orderBy:
        options.sortBy && options.sortOrder
          ? {
              [options.sortBy]: options.sortOrder,
            }
          : {
              createdAt: 'desc',
            },

      include: {
        user: true,
        service: true,
      },
    });
  }
  const total = await prisma.bookedService.count({
    //@ts-ignore
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


const manageBooking=async(data:Partial<BookedService>,id:string)=>{
  const result=await prisma.bookedService.update({
    where:{
      id:id
    },
    data
  }) 

  return result
}
export const bookedService = {
  createBookedService,
  getByEmail,
  manageBooking
};
