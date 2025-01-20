import { iJob } from '@/types/index';
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    totalViewed: {
      type: Number,
      default: 0,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    expiredAt: {
      type: Date,
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
      },
    ],
    totalView: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'open',
      enum: ['open', 'closed'],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model<iJob>('Job', jobSchema);

export default Job;
