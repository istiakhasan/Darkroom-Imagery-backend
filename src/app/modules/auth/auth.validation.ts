import { z } from 'zod';

const loginValidation = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Please provide a passwored',
    }),
  }),
});
const signUpValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Please provide a Email',
    }),
    password: z.string({
      required_error: 'Please provide a passwored',
    }),
    role: z.enum(['admin', 'customer'], {
      required_error: 'Please provide a valid role (admin or customer)',
    }),
    contactNo: z.string({
      required_error: 'Please provide a contactNo',
    }),
    address: z.string({
      required_error: 'Please provide an address',
    }),
    profileImg: z.string({
      required_error: 'Please provide a profileImg',
    }),
  }),
});

export const authValidation = {
  loginValidation,
  signUpValidation,
};
