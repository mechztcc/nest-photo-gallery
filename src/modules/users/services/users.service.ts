import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private usersRepository: Repository<User>;

  async create({ email, password, name }: CreateUserDto): Promise<User> {
    const userExists = this.usersRepository.findOne({ where: { email } });

    if (userExists) {
      throw new ConflictException('User already registered');
    }

    const hashPass = await bcrypt.hash(password, 8);

    const user = this.usersRepository.create({
      email,
      password: hashPass,
      name,
    });

    await this.usersRepository.save(user);

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
