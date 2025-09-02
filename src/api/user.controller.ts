import { Controller, Post, Put, Delete, Get, Param, Body, NotFoundException, Logger, Res, HttpStatus } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly service: UserService) { }

  // MCP endpoint: POST /users/mcp accepts any payload
  @Post('mcp')
  mcp(@Body() body: any, @Res() res): any {
    // Accept both 'operation' and 'method' for compatibility
    let op = body.operation || body.method;
    let params = body.payload || body.params;
    // If neither key is present, treat the whole body as params and default op to 'initialize'
    if (!op && body && body.initialize !== undefined) {
      op = 'initialize';
      params = body;
    }
    // If still no op, default to 'initialize' for any POST
    if (!op) {
      op = 'initialize';
      params = {};
    }
    const result = this.service.mcpCrudOperation(op, params);
    // Log for debugging
    console.log('MCP Request:', { op, params, result });
    // Always return HTTP 200 and flat JSON
    return res.status(HttpStatus.ACCEPTED).json(result);
  }

  @Post()
  users(@Body() body: any): any {
    this.logger.log('POST /users/mcp with any payload');
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
