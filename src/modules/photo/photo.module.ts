import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { PhotoController } from './controllers/photo.controller';
import { Photo } from './entities/photo.entity';
import { PhotoService } from './services/photo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Photo]),
    UsersModule,
    NestjsFormDataModule,
  ],
  controllers: [PhotoController],
  providers: [PhotoService, Photo],
  exports: [Photo],
})
export class PhotoModule {}
