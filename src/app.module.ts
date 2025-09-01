import { Module } from '@nestjs/common';
import { UserController } from './api/user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './data-layer/user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class AppModule {}
