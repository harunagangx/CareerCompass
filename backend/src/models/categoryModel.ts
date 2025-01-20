import { iCategory } from '@/types/index';
import mongoose from 'mongoose';

const categoryModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model<iCategory>('Category', categoryModel);

export default Category;
