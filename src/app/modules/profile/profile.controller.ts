import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { profileServices } from './profile.service';

const getProfileInfoByEmail = catchAsync(
  async (req: Request, res: Response) => {
    const result = await profileServices.getProfileInfoByEmail(req.user);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Profile retrived successfully',
      data: result,
    });
  }
);

const updateProfile = catchAsync(async (req: Request, res: Response) => {
    const result = await profileServices.updateProfile(
      req.user,
      req.body
    );
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Profile updated successfully',
      data: result,
    });
  });

export const profileController = {
  getProfileInfoByEmail,
  updateProfile
};
