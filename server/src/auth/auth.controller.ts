import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LogInDto } from './logIn.dto';
import { AuthService } from './auth.service';

type LogInResponse = {
  success: boolean;
  userId: number | undefined;
};

@Controller('rest/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async logIn(@Body() credentials: LogInDto): Promise<LogInResponse> {
    const authResult = await this.authService.logIn(credentials);
    let response;

    if (authResult !== false) {
      response = { success: true, userId: authResult.userId };
    } else {
      response = { success: false };
    }

    return response;
  }
}
