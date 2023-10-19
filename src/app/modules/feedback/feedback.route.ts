import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { feedbackController } from './feedback.controller';

const router = express.Router();

router.post('/',auth(ENUM_USER_ROLE.USER), feedbackController.careteFeedback);
router.get('/',auth(ENUM_USER_ROLE.USER,ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN), feedbackController.getAllFeedback);


export const feedbackRouter = router;
