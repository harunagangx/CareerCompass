import express from 'express';
import {
  createCategory,
  getAllCategory,
  deleteCategoryById,
} from '@/controllers/categoryController';
import { authorizeRoles, isAuthenticated } from '@/middlewares/authMiddleware';

const categoryRoute = express.Router();

categoryRoute.route('/category/create').post(isAuthenticated, createCategory);

categoryRoute.route('/categories').get(isAuthenticated, getAllCategory);

categoryRoute.route('/category/:id').delete(deleteCategoryById);

export default categoryRoute;
