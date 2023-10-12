import { PrismaClient, Slots } from '@prisma/client';
const prisma = new PrismaClient();
const createSlots = async (data: Slots): Promise<Slots> => {
  const result = prisma.slots.create({
    data,
  });
  return result;
};

export const slotsService = {
  createSlots,
};
