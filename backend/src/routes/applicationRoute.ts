import express from 'express';
import { isAuthenticated, authorizeRoles } from '@/middlewares/authMiddleware';
import {
  postApplication,
  getApplicationById,
  getApplicationsByJobId,
  getCurrentUserApplications,
  updateApplicationStatus,
  deleteApplicationById,
} from '@/controllers/applicationController';

const applicationRoute = express.Router();

applicationRoute.route('/:id/apply').post(isAuthenticated, postApplication);

applicationRoute
  .route('/:id')
  .get(isAuthenticated, getApplicationById)
  .put(isAuthenticated, authorizeRoles('employer'), updateApplicationStatus)
  .delete(isAuthenticated, authorizeRoles('job_seeker'), deleteApplicationById);

applicationRoute.route('/:id/applications').get(isAuthenticated, getApplicationsByJobId);

applicationRoute.route('application/me').get(isAuthenticated, getCurrentUserApplications);

export default applicationRoute;
