import { z } from 'zod';
const serviceValidationSchema = z.object({
    serviceName:z.string({
        required_error:"Service Name is required"
    }),
    service_desc:z.string({
        required_error:"Service Description is required"
    }),
    userId:z.string({
        required_error:"User Id is required"
    }),
});

export const serviceValidation = {
    serviceValidationSchema,
};
