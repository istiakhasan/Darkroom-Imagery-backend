import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { signUpController } from './auth.controller';
import { authValidation } from './auth.validation';
const router = express.Router();

router.post(
  '/signup',
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = authValidation.signUpValidation.parse(JSON.parse(req.body.data));
    return signUpController.signUP(req, res, next);
  }
);
router.post(
  '/signin',
  validateRequest(authValidation.loginValidation),
  signUpController.logIn
);
router.get(
  '/all-users',
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),
  signUpController.getAllUsers
);
router.delete(
  '/all-users/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  signUpController.deleteUsers
);
router.patch(
  '/all-users/:id',
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = authValidation.userUpdateValidation.parse(JSON.parse(req.body.data));
    return signUpController.updateUser(req, res, next);
  }
);

export const AuthRouter = router;
