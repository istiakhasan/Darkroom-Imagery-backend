import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { SignUpService } from './auth.service';
export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
};
const signUP = catchAsync(async (req: Request, res: Response) => {


  const data=JSON.parse(req.body.data )
   // @ts-ignore
  const base64Data = req?.files?.file?.data?.toString('base64')
  if (base64Data) {
     // @ts-ignore
    data["profileImg"] = `data:${req?.files?.file?.mimetype};base64,` + base64Data
  } else {
    data.profileImg = ''
  }



  const result = await SignUpService.signUp(data);
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
  const filters = pick(req.query, ['searchTerm','role']);
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
  const data=JSON.parse(req?.body?.data )
   // @ts-ignore
  const base64Data = req?.files?.file?.data?.toString('base64')
  if (base64Data) {
     // @ts-ignore
    data["profileImg"] = `data:${req?.files?.file?.mimetype};base64,` + base64Data
  } else {
    data.profileImg = ''
  }

  const result = await SignUpService.updateUser(req.params.id,data);
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
