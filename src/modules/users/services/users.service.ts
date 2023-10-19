import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const userExists = await this.usersRepository.findOne({ where: { email } });

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

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
