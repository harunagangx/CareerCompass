import Application from '@/models/applicationModel';
import catchAsyncErrors from '@/middlewares/catchAsyncErrors';
import AppError from '@/utils/appError';
import Job from '@/models/jobModel';
import cloudinary from '@/config/cloudinary';
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from '@/constants/httpCodeStatus';
import { sendApprovalEmail, sendRejectionEmail } from '@/utils/sendMail';

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const userId = req.user._id;

  const isApplied = await Application.findOne({ job: id, sender: userId });

  if (isApplied) {
    return next(new AppError('You have already applied to this job', BAD_REQUEST));
  }

  const job = await Job.findById(id);

  if (!job) {
    return next(new AppError('Job not found', BAD_REQUEST));
  }

  const result = await cloudinary.uploader.upload(req.body.resume, {
    resource_type: 'raw',
    folder: 'resume',
    format: 'pdf',
  });

  const application = await Application.create({
    job: id,
    sender: req.user._id,
    resume: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  res.status(CREATED).send({
    success: true,
    application: application,
  });
});

export const getApplicationById = catchAsyncErrors(async (req, res, next) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return next(new AppError('Application not found', NOT_FOUND));
  }

  if (req.user.role === 'employer') {
    application.status = 'under-review';
    await application.save();
  }

  res.status(OK).send({
    success: true,
    application: application,
  });
});

export const getApplicationsByJobId = catchAsyncErrors(async (req, res, next) => {
  const applications = await Application.find({ job: req.params.id });

  res.status(OK).send({
    success: true,
    applications: applications,
  });
});

export const getCurrentUserApplications = catchAsyncErrors(async (req, res, next) => {
  const applications = await Application.find({ sender: req.user._id }).populate('job');

  res.status(OK).send({
    success: true,
    applications: applications,
  });
});

export const updateApplicationStatus = catchAsyncErrors(async (req, res, next) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return next(new AppError('Application not found', NOT_FOUND));
  }

  application.status = req.body.status;

  await application.save();

  if (req.body.status === 'approved') {
    await sendApprovalEmail(application.sender, application.job, res);
  } else if (req.body.status === 'rejected') {
    await sendRejectionEmail(application.sender, application.job, res);
  }
});

export const deleteApplicationById = catchAsyncErrors(async (req, res, next) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return next(new AppError('Application not found', 404));
  }

  if (application.sender.toString() !== req.user._id.toString()) {
    return next(new AppError('You are not authorized to delete this application', 401));
  }

  await application.deleteOne({ _id: req.params.id });

  res.status(OK).send({
    success: true,
    message: 'Application deleted successfully',
  });
});
