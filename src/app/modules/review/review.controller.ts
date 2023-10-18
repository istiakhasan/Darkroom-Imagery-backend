import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { reviewService } from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {

  const result = await reviewService.createReview(req.body);
  sendResponse(res, {
    success: true,
    message: 'Service created successfully!',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const getReview = catchAsync(async (req: Request, res: Response) => {

  const result = await reviewService.getReview();
  sendResponse(res, {
    success: true,
    message: 'Service retrived successfully!',
    statusCode: httpStatus.OK,
    data: result,
  });
});
// const getAllServicesForUsers = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, ['searchTerm','minPrice','maxPrice','isAvailable','status','location','categoryId']);
//   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
//   const result = await serviceServices.getAllServicesForUsers(filters,options);
//   sendResponse(res, {
//     success: true,
//     message: 'Service retrived successfully!',
//     statusCode: httpStatus.OK,
//     data: result,
//   });
// });
// const getSingleService = catchAsync(async (req: Request, res: Response) => {

//   const result = await serviceServices.getSingleService(req.params.id);
//   sendResponse(res, {
//     success: true,
//     message: 'Servic retrived successfully!',
//     statusCode: httpStatus.OK,
//     data: result,
//   });
// });

export const reviewController = {

  createReview,
  getReview

};
