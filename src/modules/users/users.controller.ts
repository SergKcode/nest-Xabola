import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';

@Controller('users')
export class UsersController {
	constructor(private _usersService: UsersService) {}

	@Post()
	createUser(@Body() user: CreateUserDto) {
		return this._usersService.createUser(user);
	}

	@Get('/is-admin')
	isAdminUser(@Req() request: Request) {
		return this._usersService.getIsAdminUser(request);
	}
}
