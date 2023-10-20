import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from './modules/photo/photo.module';
import { User } from './modules/users/entities/user.entity';
import { Photo } from './modules/photo/entities/photo.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './modules/auth/auth.module';
import { SessionLocation } from './modules/auth/entities/session-location.entity';

@Module({
  imports: [
    UsersModule,
    PhotoModule,
    NestjsFormDataModule,
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'photo-gallery',
      entities: [User, Photo, SessionLocation],
      migrations: [__dirname + '/src/shared/migrations/**.ts'],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
