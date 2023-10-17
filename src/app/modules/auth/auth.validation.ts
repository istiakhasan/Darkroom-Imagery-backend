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

const userUpdateValidation = z.object({
  name: z.string({
    required_error: 'Name is required',
  }).optional(),
  email: z.string({
    required_error: 'Please provide a Email',
  }).optional(),
  password: z.string({
    required_error: 'Please provide a password',
  }).optional(),
  presentAddress: z.string({
    required_error: 'Present Address is required',
  }).optional(),
  permanentAddress: z.string({
    required_error: 'Permanent Address is required',
  }).optional(),
  about: z.string({
    required_error: 'About is required',
  }).optional(),
  bioData: z.string({
    required_error: 'Bio data is required',
  }).optional(),
  role: z.enum(['admin', 'user', 'super_admin'], {
    required_error: 'Please provide a valid role (admin, user, or super_admin)',
  }).optional(),
  contactNo: z.string({
    required_error: 'Please provide a contactNo',
  }).optional(),
  address: z.string({
    required_error: 'Please provide an address',
  }).optional(),
  profileImg: z.string({
    required_error: 'Please provide a profileImg',
  }).optional(),
});

export const authValidation = {
  loginValidation,
  signUpValidation,
  userUpdateValidation
};
