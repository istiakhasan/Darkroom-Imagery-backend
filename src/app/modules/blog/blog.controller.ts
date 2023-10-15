import { Request, Response } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { blogService } from './blog.service';

const careteBlog = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const uploadImage: any = await FileUploadHelper.uploadCloudinary(file);
  if (uploadImage) {
    req.body.image = uploadImage?.secure_url;
  }
  const result = await blogService.createBlog(req.body, req.user);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blog created successfully',
    data: result,
  });
});
const getAllBlogByAdminEmail = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, ['searchTerm']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await blogService.getAllBlogByAdminEmail(
      req.user,
      filters,
      options
    );
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Faq retrived successfully',
      data: result,
    });
  }
);

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  let uploadImage: any;

  if (file) {
    uploadImage = await FileUploadHelper.uploadCloudinary(file);
  }
  if (uploadImage) {
    req.body.image = uploadImage?.secure_url;
  }
  console.log(req.body,"req.body");
  return
  const result = await blogService.updateBlog(
    req.user,
    req.params.id,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Faq updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogService.deleteBlog(req.user, req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blog Deleted successfully',
    data: result,
  });
});
// const getAll = catchAsync(async (req: Request, res: Response) => {
//   const result = await faqService.getAll();
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: 'Faq Retrived successfully',
//     data: result,
//   });
// });
export const blogController = {
  careteBlog,
  getAllBlogByAdminEmail,
  deleteBlog,
  updateBlog,
};
