import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { categoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const data=JSON.parse(req.body.data )
  //@ts-ignore
  const base64Data = req?.files?.file?.data?.toString('base64')
  if (base64Data) {
    // @ts-ignore
    data["image"] = `data:${req?.files?.file?.mimetype};base64,` + base64Data
  } else {
    data.image = ''
  }

  const result = await categoryService.createCategory(data);
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
  const options = pick(req.query, ['category']);
  const result = await categoryService.getCagegoryLabel(options);
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
