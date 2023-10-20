import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { SessionLocation } from '../entities/session-location.entity';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private usersRepository: Repository<User>;

  @InjectRepository(SessionLocation)
  private sessionsLocationRepository: Repository<SessionLocation>;

  constructor(private jwtService: JwtService) {}

  async login({ email, password, lat, long }: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Password or E-mail is incorrect');
    }

    const previuslySessions = await this.sessionsLocationRepository.find({
      where: { user: { id: user.id } },
    });

    const lastSession = previuslySessions[previuslySessions.length - 1];

    const lastSessionTime = moment(new Date(lastSession?.created_at));
    const now = moment().add(3, 'hour');
    const betweenMin = now.diff(lastSessionTime, 'minute');

    if (previuslySessions.length >= 3 && betweenMin <= 5) {
      throw new UnauthorizedException(
        `You have exceeded the attempt limit, please try again in ${
          5 - betweenMin
        } min`,
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const invalidSession = this.sessionsLocationRepository.create({
        success: false,
        user: user,
        lat: lat ?? '0',
        long: long ?? '0',
      });
      this.sessionsLocationRepository.save(invalidSession);
      throw new UnauthorizedException('Password or E-mail is incorrect');
    }

    await this.sessionsLocationRepository.remove(previuslySessions);
    const payload = { id: user.id, email: user.email };
    return { user, token: await this.jwtService.signAsync(payload) };
  }
}
