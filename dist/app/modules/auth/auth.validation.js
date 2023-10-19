"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Please provide a valid email',
        }),
        password: zod_1.z.string({
            required_error: 'Please provide a passwored',
        }),
    }),
});
const signUpValidation = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
    }),
    email: zod_1.z.string({
        required_error: 'Please provide a Email',
    }),
    password: zod_1.z.string({
        required_error: 'Please provide a passwored',
    }),
    presentAddress: zod_1.z.string({
        required_error: 'Present Address is required',
    }),
    permanentAddress: zod_1.z.string({
        required_error: 'Permanent Address is required',
    }),
    about: zod_1.z.string({
        required_error: 'About is required',
    }),
    bioData: zod_1.z.string({
        required_error: 'Bio data is required',
    }),
    role: zod_1.z.enum(['admin', 'user', 'super_admin'], {
        required_error: 'Please provide a valid role (admin or customer)',
    }).optional(),
    contactNo: zod_1.z.string({
        required_error: 'Please provide a contactNo',
    }),
    address: zod_1.z.string({
        required_error: 'Please provide an address',
    }),
    profileImg: zod_1.z.string({
        required_error: 'Please provide a profileImg',
    }).optional(),
});
const userUpdateValidation = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
    }).optional(),
    email: zod_1.z.string({
        required_error: 'Please provide a Email',
    }).optional(),
    password: zod_1.z.string({
        required_error: 'Please provide a password',
    }).optional(),
    presentAddress: zod_1.z.string({
        required_error: 'Present Address is required',
    }).optional(),
    permanentAddress: zod_1.z.string({
        required_error: 'Permanent Address is required',
    }).optional(),
    about: zod_1.z.string({
        required_error: 'About is required',
    }).optional(),
    bioData: zod_1.z.string({
        required_error: 'Bio data is required',
    }).optional(),
    role: zod_1.z.enum(['admin', 'user', 'super_admin'], {
        required_error: 'Please provide a valid role (admin, user, or super_admin)',
    }).optional(),
    contactNo: zod_1.z.string({
        required_error: 'Please provide a contactNo',
    }).optional(),
    address: zod_1.z.string({
        required_error: 'Please provide an address',
    }).optional(),
    profileImg: zod_1.z.string({
        required_error: 'Please provide a profileImg',
    }).optional(),
});
exports.authValidation = {
    loginValidation,
    signUpValidation,
    userUpdateValidation
};
