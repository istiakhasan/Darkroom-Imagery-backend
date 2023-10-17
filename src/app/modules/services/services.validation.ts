import { z } from 'zod';
// {
//     "id": "1",
//     "serviceName": "Plumbing Service",
//     "service_desc": "Professional plumbing service for both residential and commercial properties.",
//     "service_img": "https://example.com/plumbing.jpg",
//     "userId": "123",
//     "categoryId": "5",
//     "price": 50,
//     "status": "ACTIVE",
//     "availability": "Mon-Fri, 9AM-5PM"
//   }
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
  status: z.enum(['upcomming', 'hot', 'tranding']),
});

export const serviceValidation = {
  serviceValidationSchema,
};
