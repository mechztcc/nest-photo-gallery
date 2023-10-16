import { Inject, Injectable } from '@nestjs/common';
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

  findAll() {
    return this.photosRepository.find();
  }

  findOne(id: number) {
    return this.photosRepository.findBy({ id });
  }
}
