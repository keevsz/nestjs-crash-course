import {
  Controller,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Body, Get, Param, Post, UseGuards } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { isNumber } from 'class-validator';
import { CreateUserDTO } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
// @UseGuards(AuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers() {
    return this.userService.fetchUsers();
  }

  // @Get()
  // getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: number) {
  //   console.log(sortDesc);
  //   return {
  //     username: 'kevsz',
  //   };
  // }

  //   @Post() EXPRESS WAY --<<<<<>
  //   createUser(@Req() request: Request, @Res() response: Response) {
  //     console.log(request.body);
  //     response.send('created!');
  //   }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDTO) {
    console.log(userData.age.toPrecision());
    return this.userService.createUser(userData);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.fetchUserById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
