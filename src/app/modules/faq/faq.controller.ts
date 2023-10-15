import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { faqService } from './faq.service';

const careteFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await faqService.createFaq(req.body, req.user);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Faq created successfully',
    data: result,
  });
});
const getFaq = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await faqService.getAllFaq(req.user, filters, options);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Faq retrived successfully',
    data: result,
  });
});

const updateFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await faqService.updateFaq(req.user, req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Faq updated successfully',
    data: result,
  });
});

const deleteFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await faqService.deleteFaq(req.user, req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Faq Deleted successfully',
    data: result,
  });
});
const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await faqService.getAll();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Faq Retrived successfully',
    data: result,
  });
});
export const faqController = {
  careteFaq,
  getFaq,
  updateFaq,
  deleteFaq,
  getAll
};
