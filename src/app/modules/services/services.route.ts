import express, { NextFunction, Request, Response } from 'express';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import { serviceController } from './services.controller';
import { serviceValidation } from './services.validation';

const router = express.Router();

router.post('/',FileUploadHelper.upload.single('file'),(req:Request,res:Response,next:NextFunction)=>{
   if(!req.body.data){
    throw new ApiError(400,"Data could not be empty")
   } 
   req.body=serviceValidation.serviceValidationSchema.parse(JSON.parse(req.body.data))
   return serviceController.createService(req,res,next)
});
router.get('/',serviceController.getAllServices);
router.get('/:id',serviceController.getSingleService);


export const servicesRouter = router;
