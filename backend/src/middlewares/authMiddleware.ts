import User from '@/models/userModel';
import catchAsyncError from '@/middlewares/catchAsyncErrors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '@/utils/appError';
import { FORBIDDEN, UNAUTHORIZED } from '@/constants/httpCodeStatus';

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError('Please login to access', UNAUTHORIZED));
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayload;

  req.user = await User.findById(decoded.id);

  next();
});

export const authorizeRoles = (role: string) =>
  catchAsyncError(async (req, res, next) => {
    if (role !== req.user.role) {
      return next(
        new AppError(
          `Role: ${req.user.role} is not allowed to access this resource`,
          FORBIDDEN
        )
      );
    }
    next();
  });
