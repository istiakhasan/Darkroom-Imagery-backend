import { z } from 'zod';
const serviceValidationSchema = z.object({
  serviceName: z.string({
    required_error: 'Service Name is required',
  }),
  service_desc: z.string({
    required_error: 'Service Description is required',
  }),
  userId: z.string({
    required_error: 'User Id is required',
  }),
  categoryId: z.string({
    required_error: 'Category Id is required',
  }),
  price: z.number({
    required_error: 'Price is required',
  }),
  availability: z.string({
    required_error: 'availability is required',
  }),
  location: z.string({
    required_error: 'Location is required',
  }),
  status: z.enum(['upcomming', 'hot', 'tranding']),
});

export const serviceValidation = {
  serviceValidationSchema,
};
