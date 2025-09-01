import { Controller, Post, Body, Logger } from '@nestjs/common';
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
}
