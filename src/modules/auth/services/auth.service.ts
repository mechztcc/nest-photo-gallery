import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private usersRepository: Repository<User>;

  constructor(private jwtService: JwtService) {}

  async login({ email, password }: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Password or E-mail is incorrect');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Password or E-mail is incorrect');
    }

    const payload = { id: user.id, email: user.email };
    return { user, token: await this.jwtService.signAsync(payload) };
  }
}
