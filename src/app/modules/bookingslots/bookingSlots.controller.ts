import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { slotsService } from './bookingSlots.service';

const createServiceSlots = catchAsync(async (req: Request, res: Response) => {
  const result = await slotsService.createSlots(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service Slot Create successfully!',
    data: result,
  });
});

export const bookingSlotsController = {
  createServiceSlots,
};
