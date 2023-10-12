import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { bookedService } from './bookedService.service';

const createBooked = catchAsync(async (req: Request, res: Response) => {
 
  const result = await bookedService.createBookedService(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User signin successfully!',
    data: result,
  });
});

export const signUpController = {
  createBooked,
};


export const bookedController={
    createBooked
}
