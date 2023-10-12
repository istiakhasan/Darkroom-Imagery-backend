import express from 'express'
import { usersController } from './users.controlelr'

const router=express.Router()


router.get('/',usersController.getAllUsers)
router.get('/:id',usersController.getSingleUser)
router.patch('/:id',usersController.updateSingleUsers)
router.delete('/:id',usersController.deleteSingleUser)


export const userRouter=router