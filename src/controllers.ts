import { AppError } from './error';
import { service } from './services';
import { CustomRequest, CustomResponse, UserData } from './types';

export const getUser = async (req: CustomRequest, res: CustomResponse) => {
  res.writeHead(200);
  res.end('Users');
};

export const getUsers = async (req: CustomRequest, res: CustomResponse) => {
  const users = await service.getUsers();
  res.writeHead(200).end(JSON.stringify(users));
};

export const addUser = async (req: CustomRequest, res: CustomResponse) => {
  if (!req.body) throw new AppError(400, 'There is no body in request');
  const user = await service.addUser(req.body as UserData);
  console.log('user: ', user);
  res.writeHead(201).end(JSON.stringify(user));
};
