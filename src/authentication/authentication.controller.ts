import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { IRequestWithUser } from './interfaces/request-with-user.interface';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';
import { JwtAuthenticationGuard } from './guards/jwt-authentication.guard';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  health() {
    return 
  }

  @Get('authenticate')
  @UseGuards(JwtAuthenticationGuard)
  authenticate(@Req() request: IRequestWithUser) {
    return request.user;
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authenticationService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(LocalAuthenticationGuard)
  login(@Req() request: IRequestWithUser) {
    const { id, role } = request.user;
    const token = this.authenticationService.login({ id, role });
    request.res.setHeader('Authentication', token);
    return request.user;
  }
}
