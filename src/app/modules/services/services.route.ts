import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import auth from '../../middlewares/auth';
import { serviceController } from './services.controller';
import { serviceValidation } from './services.validation';

const router = express.Router();

router.post('/',auth(ENUM_USER_ROLE.ADMIN),FileUploadHelper.upload.single('file'),(req:Request,res:Response,next:NextFunction)=>{
   if(!req.body.data){
    throw new ApiError(400,"Data could not be empty")
   } 
   req.body=serviceValidation.serviceValidationSchema.parse(JSON.parse(req.body.data))
   return serviceController.createService(req,res,next)
});
router.get('/',auth(ENUM_USER_ROLE.ADMIN),serviceController.getAllServices);
router.get('/users',serviceController.getAllServicesForUsers);
router.get('/:id',serviceController.getSingleService);


export const servicesRouter = router;
