import {
  createJob,
  deleteJobByID,
  getAllUnVerifiedJob,
  getAllVerifiedJob,
  getCurrentUserUnVerifiedJobs,
  getCurrentUserVerifiedJobs,
  getJobById,
  verifyJob,
} from '@/controllers/jobController';
import { authorizeRoles, isAuthenticated } from '@/middlewares/authMiddleware';
import express from 'express';

const jobRoute = express.Router();

jobRoute.route('/job/create').post(isAuthenticated, authorizeRoles('employer'), createJob);

jobRoute.route('/jobs/verified').get(isAuthenticated, getAllVerifiedJob);

jobRoute.route('/job/:id').get(isAuthenticated, getJobById);

jobRoute
  .route('/jobs/me/verified')
  .get(isAuthenticated, authorizeRoles('employer'), getCurrentUserVerifiedJobs)
  .get(isAuthenticated, authorizeRoles('employer'), getCurrentUserUnVerifiedJobs);

jobRoute
  .route('/jobs/unverified')
  .get(isAuthenticated, authorizeRoles('admin'), getAllUnVerifiedJob);

jobRoute
  .route('/admin/job/:id')
  .get(isAuthenticated, authorizeRoles('admin'), verifyJob)
  .delete(isAuthenticated, authorizeRoles('admin'), deleteJobByID);

export default jobRoute;
