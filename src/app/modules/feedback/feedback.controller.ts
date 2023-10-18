import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { feedBackService } from "./feedback.service";

const careteFeedback = catchAsync(async (req: Request, res: Response) => {
    const result = await feedBackService.createFeedback(req.body, req.user);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Thanks for your feedback',
      data: result,
    });
  });
const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
    const result = await feedBackService.getAllFeedback();
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Feedback retrived successfully',
      data: result,
    });
  });


  export const feedbackController={
    careteFeedback,
    getAllFeedback
  }


