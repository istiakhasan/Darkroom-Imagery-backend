import { z } from 'zod';

const createCategorySchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  userId: z.string({
    required_error: 'Author id is required',
  }),
});




export const categorySchema={
    createCategorySchema
}