import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import auth from '../../middlewares/auth';
import { blogController } from './blog.controller';
import { blogValidation } from './blog.validaton';

const router = express.Router();

router.post(
  '/',
  FileUploadHelper.upload.single('file'),
  auth(ENUM_USER_ROLE.ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = blogValidation.createBlogValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return blogController.careteBlog(req, res, next);
  }
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  blogController.getAllBlogByAdminEmail
);
// router.get('/get-all', faqController.getAll);
router.patch(
  '/:id',
  FileUploadHelper.upload.single('file'),
  auth(ENUM_USER_ROLE.ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = blogValidation.updateBlogValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return blogController.updateBlog(req, res, next);
  }
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), blogController.deleteBlog);

export const blogRouter = router;
