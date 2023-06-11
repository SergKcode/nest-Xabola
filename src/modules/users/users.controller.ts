import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
	constructor(private _usersService: UsersService) {}

	@Post()
	createUser(@Body() user: CreateUserDto) {
		return this._usersService.createUser(user);
	}
}
