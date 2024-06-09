import { Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor() {}

  @Post()
  @UsePipes()
  async handle(@CurrentUser() user: UserPayload) {
    console.log(user)

    return 'ok'
  }
}
