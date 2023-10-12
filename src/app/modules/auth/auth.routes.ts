import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import validateRequest from '../../middlewares/validateRequest';
import { signUpController } from './auth.controller';
import { authValidation } from './auth.validation';
const router = express.Router();

router.post('/signup',FileUploadHelper.upload.single('file'),(req:Request,res:Response,next:NextFunction)=>{
   req.body=authValidation.signUpValidation.parse(JSON.parse(req.body.data))
   return signUpController.signUP(req,res,next)
});
router.post('/signin',validateRequest(authValidation.loginValidation),signUpController.logIn);

export const AuthRouter = router;
