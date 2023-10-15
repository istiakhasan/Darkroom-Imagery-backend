import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { faqController } from './faq.controller';

const router = express.Router();

router.post('/',auth(ENUM_USER_ROLE.ADMIN), faqController.careteFaq);
router.get('/',auth(ENUM_USER_ROLE.ADMIN), faqController.getFaq);
router.get('/get-all', faqController.getAll);
router.patch('/:id',auth(ENUM_USER_ROLE.ADMIN), faqController.updateFaq);
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), faqController.deleteFaq);

export const faqRouter = router;
