import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { serviceController } from './services.controller';

const router = express.Router();

router.post('/',auth(ENUM_USER_ROLE.ADMIN), serviceController.createService);
router.get('/',auth(ENUM_USER_ROLE.ADMIN),serviceController.getAllServices);
router.get('/users',serviceController.getAllServicesForUsers);
router.get('/:id',serviceController.getSingleService);
router.patch('/:id',serviceController.updateServices);


export const servicesRouter = router;
