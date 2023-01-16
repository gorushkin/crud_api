import { v4 as uuidv4 } from 'uuid';
import { UserData } from './types';

export class User {
  constructor(
    public username: string,
    public age: number,
    public hobbies: string[],
    public id = uuidv4()
  ) {}

  update(username: string, age: number, hobbies: string[]) {
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }
}

class DB {
  db: User[];
  constructor() {
    this.db = [];
    this.addUser({ age: 23, hobbies: [], username: 'Ivan' });
  }

  async getUsers() {
    return this.db;
  }

  async getUser(id: string): Promise<User | undefined> {
    const user = await this.db.find((user) => user.id === id);
    return user;
  }

  async updateUser(id: string, { username, age, hobbies }: UserData): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    user.update(username, age, hobbies);
    return user;
  }

  async addUser({ username, age, hobbies }: UserData): Promise<User>  {
    const user = new User(username, age, hobbies);
    this.db.push(user);
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.getUser(id);
    if (!user) return undefined;
    this.db = this.db.filter((user) => user.id !== id);
    return user;
  }
}

export const db = new DB();
