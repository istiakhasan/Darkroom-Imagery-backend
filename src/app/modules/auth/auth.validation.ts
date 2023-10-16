import { z } from 'zod';

const loginValidation = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Please provide a valid email',
    }),
    password: z.string({
      required_error: 'Please provide a passwored',
    }),
  }),
});
const signUpValidation = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z.string({
    required_error: 'Please provide a Email',
  }),
  password: z.string({
    required_error: 'Please provide a passwored',
  }),
  presentAddress: z.string({
    required_error: 'Present Address is required',
  }),
  permanentAddress: z.string({
    required_error: 'Permanent Address is required',
  }),
  about: z.string({
    required_error: 'About is required',
  }),
  bioData: z.string({
    required_error: 'Bio data is required',
  }),
  role: z.enum(['admin', 'user','super_admin'], {
    required_error: 'Please provide a valid role (admin or customer)',
  }).optional(),
  contactNo: z.string({
    required_error: 'Please provide a contactNo',
  }),
  address: z.string({
    required_error: 'Please provide an address',
  }),
  profileImg: z.string({
    required_error: 'Please provide a profileImg',
  }).optional(),
});

export const authValidation = {
  loginValidation,
  signUpValidation,
};
