import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { serviceServices } from './services.service';

const createService = catchAsync(async (req: Request, res: Response) => {
  const data = JSON.parse(req.body.data);
   // @ts-ignore
  const base64Data = req?.files?.file?.data?.toString('base64');
  if (base64Data) {
     // @ts-ignore
    data['service_img'] =`data:${req?.files?.file?.mimetype};base64,` + base64Data;
  } else {
    data.service_img = '';
  }
  const result = await serviceServices.createService(data);
  sendResponse(res, {
    success: true,
    message: 'Service created successfully!',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const updateServices = catchAsync(async (req: Request, res: Response) => {
  const data = JSON.parse(req.body.data);
 // @ts-ignore
  const base64Data = req?.files?.file?.data?.toString('base64');
  if (base64Data) {
     // @ts-ignore
    data['service_img'] =`data:${req?.files?.file?.mimetype};base64,` + base64Data;
  } else {
    data.service_img = '';
  }
  const result = await serviceServices.updateServices(req.params.id, data);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Service  updated successfully',
    data: result,
  });
});
const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await serviceServices.getAllServices(filters, options);
  sendResponse(res, {
    success: true,
    message: 'Service retrived successfully!',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const getAllServicesForUsers = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, [
      'searchTerm',
      'minPrice',
      'maxPrice',
      'isAvailable',
      'status',
      'location',
      'categoryId',
    ]);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await serviceServices.getAllServicesForUsers(
      filters,
      options
    );
    sendResponse(res, {
      success: true,
      message: 'Service retrived successfully!',
      statusCode: httpStatus.OK,
      data: result,
    });
  }
);
const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceServices.getSingleService(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Servic retrived successfully!',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const deleteService = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceServices.deleteService(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Service deleted successfully!',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const serviceController = {
  getAllServices,
  createService,
  getSingleService,
  getAllServicesForUsers,
  updateServices,
  deleteService
};
