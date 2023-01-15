import { v4 as uuidv4 } from 'uuid';
import { UserData } from './types';

export class User {
  constructor(
    public username: string,
    public age: number,
    public hobbies: string[],
    public id = uuidv4()
  ) {}
}

class DB {
  db: User[];

  constructor() {
    this.db = [];
  }

  getUsers() {
    return this.db;
  }

  async addUser({ username, age, hobbies }: UserData) {
    const user = new User(username, age, hobbies);
    this.db.push(user);
    return user;
  }
}

export const db = new DB();
