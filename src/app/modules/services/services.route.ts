import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { serviceController } from './services.controller';

const router = express.Router();

router.post('/',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN), serviceController.createService);
router.get('/',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),serviceController.getAllServices);
router.get('/users',serviceController.getAllServicesForUsers);
router.get('/:id',serviceController.getSingleService);
router.patch('/:id',serviceController.updateServices);
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),serviceController.deleteService);


export const servicesRouter = router;
