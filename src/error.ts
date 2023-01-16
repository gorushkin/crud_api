import { CustomRequest, CustomResponse, UserData } from './types';

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

type Func = (req: CustomRequest, res: CustomResponse) => Promise<void>;

export const errorHandler = async (func: Func, req: CustomRequest, res: CustomResponse) => {
  try {
    await func(req, res);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(500, 'Something went wrong!');
  }
};
