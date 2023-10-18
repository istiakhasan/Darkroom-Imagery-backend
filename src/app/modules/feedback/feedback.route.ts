import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { feedbackController } from './feedback.controller';

const router = express.Router();

router.post('/',auth(ENUM_USER_ROLE.USER), feedbackController.careteFeedback);
router.get('/', feedbackController.getAllFeedback);


export const feedbackRouter = router;
