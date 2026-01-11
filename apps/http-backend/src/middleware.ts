import { NextFunction, Request, Response } from 'express';

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'something went wrong',
    });
  }
};
