import User from '@/models/userModel';
import catchAsyncErrors from '@/middlewares/catchAsyncErrors';
import AppError from '@/utils/appError';
import { NOT_FOUND, OK } from '@/constants/httpCodeStatus';

export const getUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('user does not exists', NOT_FOUND));
  }

  res.status(OK).send({
    success: true,
    user: user,
  });
});

export const getCurrentUserDetails = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;

    res.status(OK).send({
      success: true,
      user: user,
    });
  }
);

export const updateCurrentUserDetails = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;

    if (!user) {
      return next(new AppError("User does not exist", NOT_FOUND));
    }

    const updateContent = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
    };

    await User.findByIdAndUpdate(user._id, updateContent);

    res.status(OK).send({
      success: true,
      message: 'Update successfully',
    });
  }
);
