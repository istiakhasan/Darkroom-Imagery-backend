import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { blogService } from './blog.service';

const careteBlog = catchAsync(async (req: Request, res: Response) => {
  const data=JSON.parse(req.body.data )
   // @ts-ignore
  const base64Data = req?.files?.file?.data?.toString('base64')
  if (base64Data) {
     // @ts-ignore
    data["image"] = `data:${req?.files?.file?.mimetype};base64,` + base64Data
  } else {
    data.image = ''
  }
  const result = await blogService.createBlog(data, req.user);
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
  const data=JSON.parse(req.body.data )
   // @ts-ignore
  const base64Data = req?.files?.file?.data?.toString('base64')
  if (base64Data) {
     // @ts-ignore
    data["image"] = `data:${req?.files?.file?.mimetype};base64,` + base64Data
  } else {
    data.image = ''
  }
  const result = await blogService.updateBlog(
    req.user,
    req.params.id,
    data
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
const getAllBlogForUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await blogService.getAllBlogForUsers();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blog Retrived successfully',
    data: result,
  });
});
export const blogController = {
  careteBlog,
  getAllBlogByAdminEmail,
  deleteBlog,
  updateBlog,
  getAllBlogForUsers
};
