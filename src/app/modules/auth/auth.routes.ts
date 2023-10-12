import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { signUpController } from './auth.controller';
import { authValidation } from './auth.validation';
const router = express.Router();

router.post('/signup',validateRequest(authValidation.signUpValidation),signUpController.signUP);
router.post('/signin',validateRequest(authValidation.loginValidation),signUpController.logIn);

export const AuthRouter = router;
