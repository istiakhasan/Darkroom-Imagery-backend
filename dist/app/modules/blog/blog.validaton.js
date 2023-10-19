"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = void 0;
const zod_1 = require("zod");
const createBlogValidationSchema = zod_1.z.object({
    title: zod_1.z.string({
        required_error: 'Title is required',
    }),
    description: zod_1.z.string({
        required_error: 'Description is required',
    }),
});
const updateBlogValidationSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
});
exports.blogValidation = {
    createBlogValidationSchema,
    updateBlogValidationSchema,
};
