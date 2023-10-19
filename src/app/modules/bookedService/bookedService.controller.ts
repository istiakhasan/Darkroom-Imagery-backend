import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookedService } from './bookedService.service';

const createBooked = catchAsync(async (req: Request, res: Response) => {
 
  const result = await bookedService.createBookedService(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service Booked successfully!',
    data: result,
  });
});
const getByEmail = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  // const result = await faqService.getAllFaq(req.user, filters, options);
  const result = await bookedService.getByEmail(req.user,filters,options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booked Item retrived successfully!',
    data: result,
  });
});
const manageBooking = catchAsync(async (req: Request, res: Response) => {

  const result = await bookedService.manageBooking(req.body,req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking updated successfully!',
    data: result,
  });
});




export const bookedController={
    createBooked,
    getByEmail,
    manageBooking
}
