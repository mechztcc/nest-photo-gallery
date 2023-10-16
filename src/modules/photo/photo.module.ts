import { Module } from '@nestjs/common';
import { PhotoService } from './services/photo.service';
import { PhotoController } from './controllers/photo.controller';
import { Photo } from './entities/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [Photo],
})
export class PhotoModule {}
