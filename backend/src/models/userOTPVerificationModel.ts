import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { iUserOTPVerification } from '@/types/index';

const userOTPVerificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 60 * 1000),
  },
});

userOTPVerificationSchema.pre('save', async function (next) {
  if (!this.isModified('otp')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.otp = await bcrypt.hash(this.otp, salt);
});

userOTPVerificationSchema.methods.matchOTP = async function (enteredOTP: string) {
  return await bcrypt.compare(enteredOTP, this.otp);
};

const UserOTPVerification = mongoose.model<iUserOTPVerification>(
  'UserOTPVerification',
  userOTPVerificationSchema
);

export default UserOTPVerification;
