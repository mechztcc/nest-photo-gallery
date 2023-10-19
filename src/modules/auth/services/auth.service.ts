import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/modules/users/services/users.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmail(email);

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Password or E-mail is incorrect');
    }

    const payload = { id: user.id, email: user.email };
    return { user, token: await this.jwtService.signAsync(payload) };
  }
}
