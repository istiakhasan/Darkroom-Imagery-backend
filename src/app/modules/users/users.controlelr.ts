import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userService } from './users.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Users retrieved successfully',
    data: result,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getSingleUser(req.params.id as string);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User getched successfully',
    data: result,
  });
});
const updateSingleUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.updateSingleUsers(req.params.id as string,req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User updated successfully',
    data: result,
  });
});
const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.deleteSingleUser(req.params.id as string);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Uers deleted successfully',
    data: result,
  });
});

export const usersController = {
  getAllUsers,
  getSingleUser,
  updateSingleUsers,
  deleteSingleUser
};
