import express from 'express';
import { login, logout, register, resendOTP, verifyEmail } from '@/controllers/authController';
import { authorizeRoles, isAuthenticated } from '@/middlewares/authMiddleware';

const authRoute = express.Router();

authRoute.route('/auth/register').post(register);

authRoute.route('/auth/verify-email').post(verifyEmail);

authRoute.route('/auth/resend-otp').post(resendOTP);

authRoute.route('/auth/login').post(login);

authRoute.route('/auth/logout').get(isAuthenticated, logout);

export default authRoute;
