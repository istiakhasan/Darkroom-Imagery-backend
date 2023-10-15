import { z } from 'zod';
const createBlogValidationSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  description: z.string({
    required_error: 'Description is required',
  }),
});
const updateBlogValidationSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export const blogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
