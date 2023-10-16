import { BookedService, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createBookedService = async (data: BookedService[]) => {
    const results = await Promise.all(
      data.map(async (element) => {
        const item = await prisma.bookedService.create({
          data: element,
        });
        console.log(item, "item");
        return item;
      })
    );
  
    return results;
  };


export const bookedService = {
  createBookedService,
};
