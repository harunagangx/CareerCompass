import mongoose from 'mongoose';

export interface iUser extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  avatarUrl: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  comparePassword: (val: string) => Promise<boolean>;
  generateToken: () => Promise<string>;
}

export interface iUserOTPVerification extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  otp: string;
  createdAt: Date;
  expiresAt: Date;
  matchOTP: (enteredOTP: string) => Promise<boolean>;
}


export interface iJob extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  category: mongoose.Schema.Types.ObjectId;
  isVerified: boolean;
  totalViewed: number;
  postedBy: iUser;
  expiredAt: Date;
  applications: [mongoose.Schema.Types.ObjectId];
}


export interface iApplication extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  job: iJob;
  sender: iUser;
  resume: {
    public_id: string;
    url: string;
  };
  status: string;
  createdAt: Date;
}

export interface iCategory extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  jobs: [iJob];
}


