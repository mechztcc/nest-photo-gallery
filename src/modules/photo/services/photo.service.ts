import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/services/users.service';
import { Photo } from '../entities/photo.entity';
import { CreatePhotoDto } from '../dto/create-photo.dto';

@Injectable()
export class PhotoService {
  @InjectRepository(Photo)
  private photosRepository: Repository<Photo>;

  @Inject()
  private usersService: UsersService;

  async create({ name, userId }: CreatePhotoDto): Promise<any> {
    const user = await this.usersService.findOne(userId);

    const photo = this.photosRepository.create({
      name,
      path: name,
      user: user,
    });

    await this.photosRepository.save(photo);

    return photo;
  }

  async findAll(userId: number) {
    const userExists = await this.usersService.findOne(userId);

    if (!userExists) {
      throw new NotFoundException('User not found.');
    }

    let photos = await this.photosRepository.find();

    photos = photos.map((photo) => {
      return {
        ...photo,
        url: `localhost:3000/photo/${photo.name}`,
      };
    });

    return photos;
  }

  findOne(id: number) {
    return this.photosRepository.findBy({ id });
  }
}
