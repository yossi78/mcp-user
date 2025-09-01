import { Injectable } from '@nestjs/common';
import { User } from '../model/user.entity';

@Injectable()
export class UserRepository {
  private users: User[] = [];
  private nextId = 1;

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  create(user: Omit<User, 'id'>): User {
    const newUser: User = { ...user, id: this.nextId++ };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, user: Partial<Omit<User, 'id'>>): User | undefined {
    const existing = this.findById(id);
    if (!existing) return undefined;
    Object.assign(existing, user);
    return existing;
  }

  delete(id: number): boolean {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return false;
    this.users.splice(idx, 1);
    return true;
  }
}
