import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from '../photo/entities/photo.entity';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, User])],
  controllers: [UsersController],
  providers: [UsersService, User],
  exports: [User, UsersService],
})
export class UsersModule {}
