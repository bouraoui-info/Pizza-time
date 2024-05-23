import { Module } from '@nestjs/common';
import { UsersController } from '../users/users.controlleur';

import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { BraintreeProvider } from './braintreeprovider';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService,BraintreeProvider]
})
export class UsersModule {}