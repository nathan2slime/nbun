import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Session } from '@prisma/client'
import { hash, compare } from 'bcryptjs'

import { SignInDto, SignUpDto } from '~/app/auth/auth.dto'
import { SessionService } from '~/app/session/session.service'
import { UserService } from '~/app/user/user.service'
import { INVALID_CREDENTIALS, USER_NOT_FOUND } from '~/errors'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService
  ) {}

  async signIn(data: SignInDto) {
    const user = await this.userService.getByUsername(data.username)
    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND)

    const isValidPassword = await compare(data.password, user.password)
    if (!isValidPassword)
      throw new HttpException(INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED)

    user.password = undefined

    const session = await this.sessionService.create(user.id)

    return session
  }

  async signUp(data: SignUpDto) {
    const userAlreadyExists = await this.userService.getByUsername(
      data.username
    )

    if (userAlreadyExists)
      throw new HttpException('Perfil já existe', HttpStatus.CONFLICT)

    data.password = await hash(data.password, 10)

    const user = await this.userService.create(data)

    const session = await this.sessionService.create(user.id)

    return session
  }

  async signOut(session: Session) {
    await this.sessionService.expireSession(session.id)
  }
}
