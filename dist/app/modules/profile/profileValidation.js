"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileValidation = void 0;
const zod_1 = require("zod");
const profileUpdateValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
    presentAddress: zod_1.z.string().optional(),
    permanentAddress: zod_1.z.string().optional(),
    about: zod_1.z.string().optional(),
    bioData: zod_1.z.string().optional(),
    role: zod_1.z.enum(['admin', 'customer']).optional(),
    contactNo: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    profileImg: zod_1.z.string().optional(),
});
exports.profileValidation = {
    profileUpdateValidationSchema
};
