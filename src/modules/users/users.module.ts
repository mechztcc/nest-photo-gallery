import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from '../photo/entities/photo.entity';
import { PhotoModule } from '../photo/photo.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), PhotoModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [User],
})
export class UsersModule {}
