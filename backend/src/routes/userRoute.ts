import express from 'express';
import {
  getCurrentUserDetails,
  updateCurrentUserDetails,
} from '@/controllers/userController';
import { isAuthenticated } from '@/middlewares/authMiddleware';

const userRoute = express.Router();

userRoute.route('/user/me').get(isAuthenticated, getCurrentUserDetails);

userRoute
  .route('/user/me/update')
  .put(isAuthenticated, updateCurrentUserDetails);

export default userRoute;
