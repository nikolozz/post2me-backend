import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { RequestWithUserInterface } from './interfaces/request-with-user.interface';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';
import { JwtAuthenticationGuard } from './guards/jwt-authentication.guard';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('authenticate')
  @UseGuards(JwtAuthenticationGuard)
  authenticate(@Req() request: RequestWithUserInterface) {
    return request.user;
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authenticationService.register(registerDto);
  }

  @HttpCode(200)
  @Post('login')
  @UseGuards(LocalAuthenticationGuard)
  login(@Req() request: RequestWithUserInterface) {
    const { username, role } = request.user;
    const token = this.authenticationService.login({ username, role });
    request.res.setHeader('Authentication', token);
    return request.user;
  }
}
