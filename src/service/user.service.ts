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

  // MCP placeholder for AI tools
  mcpCrudOperation(operation: string, payload: any): any {
    // Implement MCP logic here
    return { operation, payload };
  }
}
