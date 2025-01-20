import Job from '@/models/jobModel';
import catchAsyncErrors from '@/middlewares/catchAsyncErrors';
import AppError from '@/utils/appError';
import { BAD_REQUEST, CREATED, OK } from '@/constants/httpCodeStatus';
import Category from '@/models/categoryModel';

export const createJob = catchAsyncErrors(async (req, res, next) => {
  const { name, description, category, expiredAt } = req.body;

  if (!name || !description || !category || !expiredAt) {
    return next(new AppError('Please provide full job details', BAD_REQUEST));
  }

  const isCategoryExist = await Category.findById(category);

  if (!isCategoryExist) {
    return next(new AppError('Category does not exists', BAD_REQUEST));
  }

  const job = await Job.create({
    name: name,
    description: description,
    category: category,
    postedBy: req.user._id,
    expiredAt: expiredAt,
  });


  res.status(CREATED).send({
    success: true,
    job: job,
  });
});

export const getCurrentUserVerifiedJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ postedBy: req.user._id, isVerified: true });

  res.status(OK).send({
    success: true,
    jobs: jobs,
  });
});

export const getCurrentUserUnVerifiedJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ postedBy: req.user._id, isVerified: false });

  res.status(OK).send({
    success: true,
    jobs: jobs,
  });
});

export const getAllUnVerifiedJob = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ isVerified: false });

  res.status(OK).send({
    success: true,
    jobs: jobs,
  });
});

export const getAllVerifiedJob = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ isVerified: true });

  res.status(OK).send({
    success: true,
    jobs: jobs,
  });
});

export const getJobById = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new AppError('Job does not exists', BAD_REQUEST));
  }

  job.totalViewed += 1;
  await job.save();

  res.status(OK).send({
    success: true,
    job: job,
  });
});

export const verifyJob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new AppError('Job does not exists', BAD_REQUEST));
  }

  job.isVerified = true;
  await job.save();

  res.status(OK).send({
    success: true,
    job: job,
  });
});

export const deleteJobByID = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new AppError('Job does not exists', BAD_REQUEST));
  }

  await Job.deleteOne({ _id: job._id });

  res.status(OK).send({
    success: true,
    message: 'Job deleted successfully',
  });
});

export const updateJobById = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new AppError('Job does not exists', BAD_REQUEST));
  }

  const newData = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
  };

  await Job.updateOne({ _id: job._id }, newData);

  res.status(OK).send({
    success: true,
    message: 'Job updated successfully',
  });
});
