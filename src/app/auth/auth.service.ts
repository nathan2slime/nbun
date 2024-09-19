import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcryptjs';

import { SignInDto, SignUpDto } from '~/app/auth/auth.dto';
import { UserService } from '~/app/user/user.service';
import { env } from '~/env';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: SignInDto) {
    const user = await this.userService.getByUsername(data.username);
    if (!user)
      throw new HttpException('Perfil não encontrado', HttpStatus.NOT_FOUND);

    const isValidPassword = await compare(data.password, user.password);
    if (!isValidPassword)
      throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);

    const accessToken = await this.jwtService.signAsync(
      { userId: user.id },
      {
        secret: env.SESSION_KEY,
        expiresIn: '30d',
      },
    );

    return { accessToken, user };
  }

  async signUp(data: SignUpDto) {
    const userAlreadyExists = await this.userService.getByUsername(
      data.username,
    );

    if (userAlreadyExists)
      throw new HttpException('Perfil já existe', HttpStatus.CONFLICT);

    data.password = await hash(data.password, 10);

    const user = await this.userService.create(data);

    const accessToken = await this.jwtService.signAsync(
      { userId: user.id },
      {
        secret: env.SESSION_KEY,
        expiresIn: '30d',
      },
    );

    return { accessToken, user };
  }
}
