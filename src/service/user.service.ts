import { Injectable } from '@nestjs/common';
import { User } from '../model/user.entity';
import { UserRepository } from '../data-layer/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  getAll(): User[] {
    return this.repo.findAll();
  }

  getById(id: number): User | undefined {
    return this.repo.findById(id);
  }

  create(user: Omit<User, 'id'>): User {
    return this.repo.create(user);
  }

  update(id: number, user: Partial<Omit<User, 'id'>>): User | undefined {
    return this.repo.update(id, user);
  }

  delete(id: number): boolean {
    return this.repo.delete(id);
  }

  // MCP endpoint with real CRUD logic
  mcpCrudOperation(operation: string, payload: any): any {
    switch (operation) {
      case 'create':
        return this.create(payload);
      case 'read':
        if (payload && payload.id !== undefined) {
          const user = this.getById(Number(payload.id));
          if (!user) return { error: `The user with id of ${payload.id} does not exists` };
          return user;
        }
        return this.getAll();
      case 'update':
        if (payload && payload.id !== undefined) {
          const updated = this.update(Number(payload.id), payload);
          if (!updated) return { error: `The user with id of ${payload.id} does not exists` };
          return updated;
        }
        return { error: 'Missing id for update' };
      case 'delete':
        if (payload && payload.id !== undefined) {
          const success = this.delete(Number(payload.id));
          if (!success) return { error: `The user with id of ${payload.id} does not exists` };
          return { success };
        }
        return { error: 'Missing id for delete' };
      default:
        return { error: 'Unknown operation' };
    }
  }
}
