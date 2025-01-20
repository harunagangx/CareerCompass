import Category from '@/models/categoryModel';
import catchAsyncErrors from '@/middlewares/catchAsyncErrors';
import AppError from '@/utils/appError';
import { CREATED, NOT_FOUND, OK } from '@/constants/httpCodeStatus';

export const createCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(CREATED).send({
    success: true,
    category: category,
  });
});

export const getAllCategory = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  res.status(OK).send({
    success: true,
    categories: categories,
  });
});

export const deleteCategoryById = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError('category does not exist', NOT_FOUND));
  }

  await Category.deleteOne({ _id: category._id });

  res.status(200).json({
    success: 'true',
    message: 'delete successfully',
  });
});
