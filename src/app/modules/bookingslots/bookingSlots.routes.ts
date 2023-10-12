import express from 'express'
import { bookingSlotsController } from './bookingSlots.controller'
const router=express.Router()


router.post('/',bookingSlotsController.createServiceSlots)



export const bookingSlots=router