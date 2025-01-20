import User from '@/models/userModel';
import catchAsyncErrors from '@/middlewares/catchAsyncErrors';
import AppError from '@/utils/appError';
import sendCookie from '@/utils/sendCookie';
import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from '@/constants/httpCodeStatus';
import { sendOTPVerificationEmail } from '@/utils/sendMail';
import UserOTPVerification from '@/models/userOTPVerificationModel';
import cloudinary from '@/config/cloudinary';

export const register = catchAsyncErrors(async (req, res, next) => {
  const isEmailExist = await User.findOne({ email: req.body.email });

  if (isEmailExist) {
    return next(new AppError('this email already been used', CONFLICT));
  }

  const result = await cloudinary.uploader.upload(req.body.avatar, {
    resource_type: 'image',
    folder: 'avatars',
  });

  req.body.avatar = {
    public_id: result.public_id,
    url: result.secure_url,
  }

  const user = await User.create(req.body);

  await sendOTPVerificationEmail(user, res);
});

export const verifyEmail = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('user does not exists', NOT_FOUND));
  }

  const userOTP = await UserOTPVerification.findOne({ user: user._id });

  if (!userOTP) {
    return next(new AppError('otp not found', NOT_FOUND));
  }

  if (userOTP.expiresAt < new Date()) {
    await UserOTPVerification.deleteMany({ user: user._id });
    return next(new AppError('otp expired', UNAUTHORIZED));
  }

  const isMatch = await userOTP.matchOTP(otp);

  if (!isMatch) {
    return next(new AppError('otp does not match', BAD_REQUEST));
  }

  user.isVerified = true;
  await user.save();

  await UserOTPVerification.deleteMany({ user: user._id });

  res.status(OK).send({
    success: true,
    message: 'email verified successfully',
  });
});

export const resendOTP = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('user does not exists', NOT_FOUND));
  }

  if (user.isVerified) {
    return next(new AppError('email already verified', BAD_REQUEST));
  }

  await UserOTPVerification.deleteMany({ user: user._id });
  await sendOTPVerificationEmail(user, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }).select('+password');

  if (!user) {
    return next(new AppError('user does not exists', NOT_FOUND));
  }

  if (!user.isVerified) {
    return next(new AppError('email not verified', UNAUTHORIZED));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new AppError('password does not match', BAD_REQUEST));
  }

  sendCookie(user, OK, res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(OK).send({
    success: true,
    message: 'logout successfully',
  });
});
