import { NextFunction, Request, Response } from 'express';

type AsyncControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const catchAsyncErrors =
  (controller: AsyncControllerType): AsyncControllerType =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchAsyncErrors;
