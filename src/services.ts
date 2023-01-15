import { db, User } from './db';
import { AppError } from './error';
import { UserData } from './types';

const addUser = async (data: UserData): Promise<User> => {
  if (!data.age || !data.hobbies || !data.username)
    throw new AppError(400, 'You have to set all required fileds');
  return await db.addUser(data);
};

const getUsers = async (): Promise<User[]> => {
  return db.getUsers();
};

export const service = { addUser, getUsers };
