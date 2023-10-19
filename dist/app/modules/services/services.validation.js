"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceValidation = void 0;
const zod_1 = require("zod");
const serviceValidationSchema = zod_1.z.object({
    serviceName: zod_1.z.string({
        required_error: 'Service Name is required',
    }),
    service_desc: zod_1.z.string({
        required_error: 'Service Description is required',
    }),
    userId: zod_1.z.string({
        required_error: 'User Id is required',
    }),
    categoryId: zod_1.z.string({
        required_error: 'Category Id is required',
    }),
    price: zod_1.z.number({
        required_error: 'Price is required',
    }),
    availability: zod_1.z.string({
        required_error: 'availability is required',
    }),
    location: zod_1.z.string({
        required_error: 'Location is required',
    }),
    status: zod_1.z.enum(['upcomming', 'hot', 'tranding']),
});
exports.serviceValidation = {
    serviceValidationSchema,
};
