import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
import { categoryController } from './category.controller'
const router=express.Router()


router.post('/create-category',
 categoryController.createCategory
)
router.get('/',auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),categoryController.getAllCategories)
router.get('/all',categoryController.getCagegoryLabel)
router.get('/:id',categoryController.getSingleCategory)
router.patch('/:id',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),categoryController.updateCategory)
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),categoryController.deleteCategory)


export const categoryRouter=router