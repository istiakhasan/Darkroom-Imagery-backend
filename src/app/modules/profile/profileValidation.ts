import { z } from "zod";

const profileUpdateValidationSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    about: z.string().optional(),
    bioData: z.string().optional(),
    role: z.enum(['admin', 'customer']).optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  });
  export const profileValidation = {
    profileUpdateValidationSchema
  };
  