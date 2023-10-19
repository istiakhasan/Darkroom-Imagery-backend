"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const zod_1 = require("zod");
const createCategorySchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
    }),
    userId: zod_1.z.string({
        required_error: 'Author id is required',
    }),
});
exports.categorySchema = {
    createCategorySchema
};
