import { Request, Response } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { categoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  let uploadImage: any;
  if (file) {
    uploadImage = await FileUploadHelper.uploadCloudinary(file);
  }
  if (uploadImage) {
    req.body.image = uploadImage?.secure_url;
  }
  const result = await categoryService.createCategory(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Category created successfully',
    data: result,
  });
});
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await categoryService.getAllCategories( req.user,
    filters,
    options);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Categories fetched successfully',
    data: result,
  });
});
const getCagegoryLabel = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getCagegoryLabel();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Categories fetched successfully',
    data: result,
  });
});
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getSingleCategory(
    req.params.id as string
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Category fetched successfully',
    data: result,
  });
});
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.updateCategory(
    req.params.id as string,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Category updated successfully',
    data: result,
  });
});
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.deleteCategory(req.params.id as string);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Category deleted successfully',
    data: result,
  });
});

export const categoryController = {
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  createCategory,
  getCagegoryLabel
};
