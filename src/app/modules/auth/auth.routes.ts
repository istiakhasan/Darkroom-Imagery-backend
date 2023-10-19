import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { signUpController } from './auth.controller';
import { authValidation } from './auth.validation';
const router = express.Router();

router.post('/signup', signUpController.signUP);
router.post(
  '/signin',
  validateRequest(authValidation.loginValidation),
  signUpController.logIn
);
router.get(
  '/all-users',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  signUpController.getAllUsers
);
router.delete(
  '/all-users/:id',
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),
  signUpController.deleteUsers
);
router.patch(
  '/all-users/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  signUpController.updateUser
);

export const AuthRouter = router;
