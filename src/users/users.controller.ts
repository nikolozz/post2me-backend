import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { IRequestWithUser } from '../authentication/interfaces/request-with-user.interface';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  @UseGuards(JwtAuthenticationGuard)
  public getUser(@Param('userId') userId: number) {
    return this.usersService.getUser(userId);
  }

  @Post('add-avatar')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthenticationGuard)
  addAvatar(
    @Req() request: IRequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addAvatar(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }

  @Patch()
  @UseGuards(JwtAuthenticationGuard)
  public updateUser(
    @Body() updateBody: UpdateUserDto,
    @Req() request: IRequestWithUser,
  ) {
    return this.usersService.updateUser(request.user.id, updateBody);
  }

  @Delete('avatar')
  @UseGuards(JwtAuthenticationGuard)
  deleteAvatar(@Req() request: IRequestWithUser) {
    return this.usersService.deleteAvatar(request.user.id);
  }
}
