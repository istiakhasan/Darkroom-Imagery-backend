import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import { FileUploadHelper } from '../../../helpers/FileUploadHelpers';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { SignUpService } from './auth.service';
export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
};
const signUP = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const uploadImage: any = await FileUploadHelper.uploadCloudinary(file);
  if (uploadImage) {
    req.body.profileImg = uploadImage?.secure_url;
  }
  const result = await SignUpService.signUp(req.body);
  sendResponse(res, {
    success: true,
    message: 'User created successfully!',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const logIn = catchAsync(async (req: Request, res: Response) => {
  const result = await SignUpService.login(req.body);
  const { refreshToken, accessToken } = result;
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<ILoginResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User signin successfully!',
    token: accessToken,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await SignUpService.getAllUsers(req.user,filters, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrived successfully!',
    data: result,
  });
});
const deleteUsers = catchAsync(async (req: Request, res: Response) => {
 
  const result = await SignUpService.deleteUsers(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Deleted successfully!',
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  let uploadImage: any;

  if (file) {
    uploadImage = await FileUploadHelper.uploadCloudinary(file);
  }
  if (uploadImage) {
    req.body.profileImg = uploadImage?.secure_url;
  }
  const result = await SignUpService.updateUser(req.params.id,req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Deleted successfully!',
    data: result,
  });
});

export const signUpController = {
  signUP,
  logIn,
  getAllUsers,
  deleteUsers,
  updateUser
};
