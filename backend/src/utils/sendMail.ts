import EmailTransporter from '@/config/nodemailer';
import UserOTPVerification from '@/models/userOTPVerificationModel';
import { APPROVED_EMAIL_TEMPLATE, REJECTED_EMAIL_TEMPLATE, VERIFY_EMAIL_TEMPLATE } from '@/constants/mailTemplate';
import { Response } from 'express';
import { iJob, iUser } from '@/types/index';
import { BAD_REQUEST, OK } from '@/constants/httpCodeStatus';

export const sendOTPVerificationEmail = async (user: iUser, res: Response) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'Verify your email',
    html: VERIFY_EMAIL_TEMPLATE.replace('{verificationCode}', otp),
  };

  const newOTPVerification = new UserOTPVerification({
    user: user._id,
    otp: otp,
  });
  await newOTPVerification.save();

  await EmailTransporter.sendMail(mailOptions, (error) => {
    if (error) {
      res.status(BAD_REQUEST).send({
        success: false,
        message: error.message,
      });
    } else {
      res.status(OK).send({
        success: true,
        message: 'Verification email has been sent',
      });
    }
  });
};

export const sendApprovalEmail = async (user: iUser, job: iJob, res: Response) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'Job Application Approval',
    html: APPROVED_EMAIL_TEMPLATE.replace('{CandidateName}', user.name)
      .replace('{JobName}', job.name)
      .replace('{CompanyName}', job.postedBy.name),
  };

  await EmailTransporter.sendMail(mailOptions, (error) => {
    if (error) {
      res.status(BAD_REQUEST).send({
        success: false,
        message: error.message,
      });
    } else {
      res.status(OK).send({
        success: true,
        message: 'Approval email has been sent',
      });
    }
  });
};

export const sendRejectionEmail = async (user: iUser, job: iJob, res: Response) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'Job Application Rejection',
    html: REJECTED_EMAIL_TEMPLATE.replace('{CandidateName}', user.name)
      .replace('{JobName}', job.name)
      .replace('{CompanyName}', job.postedBy.name),
  };

  await EmailTransporter.sendMail(mailOptions, (error) => {
    if (error) {
      res.status(BAD_REQUEST).send({
        success: false,
        message: error.message,
      });
    } else {
      res.status(OK).send({
        success: true,
        message: 'Rejection email has been sent',
      });
    }
  });
};
