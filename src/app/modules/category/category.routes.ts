import express from 'express'
import { z } from 'zod'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { categoryController } from './category.controller'

const categoryZod=z.object({
    body:z.object({
        title:z.string({required_error:"Title is required"})
    })
})
const router=express.Router()


router.post('/create-category',validateRequest(categoryZod),auth(ENUM_USER_ROLE.ADMIN),categoryController.createCategory)
router.get('/',categoryController.getAllCategories)
router.get('/:id',categoryController.getSingleCategory)
router.patch('/:id',auth(ENUM_USER_ROLE.ADMIN),categoryController.updateCategory)
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN),categoryController.deleteCategory)


export const categoryRouter=router