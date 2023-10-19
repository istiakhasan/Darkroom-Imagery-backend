import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { bookedController } from './bookedService.controller';

const router = express.Router();

router.post('/', bookedController.createBooked);
router.get('/',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER), bookedController.getByEmail);
router.patch('/:id',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER), bookedController.manageBooking);

export const bookedRouter = router;
