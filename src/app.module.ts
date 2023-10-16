import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from './modules/photo/photo.module';
import { User } from './modules/users/entities/user.entity';
import { Photo } from './modules/photo/entities/photo.entity';

@Module({
  imports: [
    UsersModule,
    PhotoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'photo-gallery',
      entities: [User, Photo],
      migrations: [__dirname + '/src/shared/migrations/**.ts'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
