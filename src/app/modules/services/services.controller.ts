import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { serviceServices } from './services.service';

const createService = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;

  const uploadImage: any = await FileUploadHelper.uploadCloudinary(file);
  if (uploadImage) {
    req.body.service_img = uploadImage?.secure_url;
  }
  const result = await serviceServices.createService(req.body);
  sendResponse(res, {
    success: true,
    message: 'Service created successfully!',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await serviceServices.getAllServices(filters,options);
  sendResponse(res, {
    success: true,
    message: 'Service retrived successfully!',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const getAllServicesForUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm','minPrice','maxPrice','isAvailable','status','location','categoryId']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await serviceServices.getAllServicesForUsers(filters,options);
  sendResponse(res, {
    success: true,
    message: 'Service retrived successfully!',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const getSingleService = catchAsync(async (req: Request, res: Response) => {

  const result = await serviceServices.getSingleService(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Servic retrived successfully!',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const serviceController = {
  getAllServices,
  createService,
  getSingleService,
  getAllServicesForUsers
};
