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

    return {
      id: photo.id,
      path: photo.path,
      name: photo.name,
      created_at: photo.created_at,
      updated_at: photo.updated_at,
    };
  }

  async findAll(userId: number) {
    const userExists = await this.usersService.findOne(userId);

    if (!userExists) {
      throw new NotFoundException('User not found.');
    }

    let photos = await this.photosRepository.find({
      where: { user: { id: userExists.id } },
    });

    photos = photos.map((photo) => {
      return {
        ...photo,
        url: `${process.env.FILE_URL}${photo.name}`,
      };
    });

    return photos;
  }

  findOne(id: number) {
    return this.photosRepository.findBy({ id });
  }
}
