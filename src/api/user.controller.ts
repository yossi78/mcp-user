import { Controller, Post, Put, Delete, Get, Param, Body, NotFoundException, Logger } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly service: UserService) {}

  // MCP endpoint only
  @Post('mcp')
  mcpCrud(@Body() body: any): any {
    this.logger.log('POST MCP operation');
    return this.service.mcpCrudOperation(body.operation, body.payload);
  }

  // Read all users
  @Get()
  getAll(): any {
    this.logger.log('GET all users');
    return this.service.getAll();
  }

  // Read user by id
  @Get(':id')
  getById(@Param('id') id: string): any {
    this.logger.log(`GET user by id: ${id}`);
    const user = this.service.getById(Number(id));
    if (!user) throw new NotFoundException(`The user with id of ${id} does not exists`);
    return user;
  }

  // Edit user
  @Put(':id')
  update(@Param('id') id: string, @Body() user: any): any {
    this.logger.log(`PUT update user id: ${id}`);
    const updated = this.service.update(Number(id), user);
    if (!updated) throw new NotFoundException(`The user with id of ${id} does not exists`);
    return updated;
  }

  // Remove user
  @Delete(':id')
  delete(@Param('id') id: string): any {
    this.logger.log(`DELETE user id: ${id}`);
    const success = this.service.delete(Number(id));
    if (!success) throw new NotFoundException(`The user with id of ${id} does not exists`);
    return { success };
  }
}
