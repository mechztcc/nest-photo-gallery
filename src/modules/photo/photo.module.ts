import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PhotoController } from './controllers/photo.controller';
import { Photo } from './entities/photo.entity';
import { PhotoService } from './services/photo.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [PhotoController],
  providers: [PhotoService, Photo],
  exports: [Photo],
})
export class PhotoModule {}
