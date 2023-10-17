import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import auth from '../../middlewares/auth';
import { profileController } from './profile.controller';
import { profileValidation } from './profileValidation';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.USER),
  profileController.getProfileInfoByEmail
);
router.patch(
  '/update',
  auth(
    ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.USER
  ),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = profileValidation.profileUpdateValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return profileController.updateProfile(req,res,next);
  }
);

export const profileRouter = router;
