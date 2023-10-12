import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import catchAsync from '../../../shared/catchAsync';
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

export const serviceController = {
  createService,
};
