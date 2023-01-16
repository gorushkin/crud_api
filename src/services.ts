import { db, User } from './db';
import { AppError } from './error';
import { UserData } from './types';
import { checkUser, validateId } from './utils';

const addUser = async (data: UserData): Promise<User> => {
  if (!data.age || !data.hobbies || !data.username)
    throw new AppError(400, 'You have to set all required fileds');
  const user = await db.addUser(data);
  return user;
};

const getUsers = async (): Promise<User[]> => {
  return db.getUsers();
};

const getUser = async (id: string): Promise<User> => {
  validateId(id);
  const user = await db.getUser(id);
  if (!user) throw new AppError(404, 'User not found');
  return user;
};

const updateUser = async (id: string, data: UserData) => {
  validateId(id);
  await checkUser(id);
  if (!data.age || !data.hobbies || !data.username)
    throw new AppError(400, 'You have to set all required fileds');
  return await db.updateUser(id, data);
};

const deleteUser = async (id: string): Promise<User | undefined> => {
  validateId(id);
  await checkUser(id);
  return db.deleteUser(id);
};

export const service = { addUser, getUsers, getUser, updateUser, deleteUser };
