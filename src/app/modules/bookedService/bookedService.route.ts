import express from 'express';
import { bookedController } from './bookedService.controller';

const router = express.Router();

router.post('/', bookedController.createBooked);

export const bookedRouter = router;
