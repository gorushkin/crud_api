import { AppError } from './error';
import { service } from './services';
import { CustomRequest, CustomResponse, UserData } from './types';

export const getUser = async (req: CustomRequest, res: CustomResponse) => {
  const id = req.params.id;
  const user = await service.getUser(id);
  res.setHeader('Content-Type', 'application/json').writeHead(200).end(JSON.stringify(user));
};

export const getUsers = async (req: CustomRequest, res: CustomResponse) => {
  const users = await service.getUsers();
  res.setHeader('Content-Type', 'application/json').writeHead(200).end(JSON.stringify(users));
};

export const addUser = async (req: CustomRequest, res: CustomResponse) => {
  if (!req.body) throw new AppError(400, 'There is no body in request');
  const user = await service.addUser(req.body as UserData);
  res.setHeader('Content-Type', 'application/json').writeHead(201).end(JSON.stringify(user));
};

export const updateUser = async (req: CustomRequest, res: CustomResponse) => {
  const id = req.params.id;
  if (!req.body) throw new AppError(400, 'There is no body in request');
  const user = await service.updateUser(id, req.body as UserData);
  res.setHeader('Content-Type', 'application/json').writeHead(200).end(JSON.stringify(user));
};

export const deleteUser = async (req: CustomRequest, res: CustomResponse) => {
  const id = req.params.id;
  const user = await service.deleteUser(id);
  res.setHeader('Content-Type', 'application/json').writeHead(204).end(JSON.stringify(user));
};
