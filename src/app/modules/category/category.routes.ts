import express from 'express'
import { z } from 'zod'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
import { categoryController } from './category.controller'

const categoryZod=z.object({
    body:z.object({
        title:z.string({required_error:"Title is required"})
    })
})
const router=express.Router()


router.post('/create-category',
 categoryController.createCategory
)
// router.post('/create-category',FileUploadHelper.upload.single('file'),
// (req: Request, res: Response, next: NextFunction) => {
//   req.body = categorySchema.createCategorySchema.parse(JSON.parse(req.body.data));
//   return categoryController.createCategory(req, res, next);
// })
router.get('/',auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),categoryController.getAllCategories)
router.get('/all',auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),categoryController.getCagegoryLabel)
router.get('/:id',categoryController.getSingleCategory)
router.patch('/:id',auth(ENUM_USER_ROLE.ADMIN),categoryController.updateCategory)
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN),categoryController.deleteCategory)


export const categoryRouter=router