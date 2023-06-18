import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { FindUsersDto } from '../dto/find-users.dto';
import { UserRoles } from '../models/users.model';

@Injectable()
export class UsersService {
	private readonly _logger = new Logger(UsersService.name, { timestamp: true });

	constructor(@InjectRepository(User) private _usersRepository: Repository<User>) {}

	createUser(user: CreateUserDto): Observable<User> {
		const { email, password, role } = user;
		this._logger.debug(`Creating new user with email ${email}`);
		return from(bcrypt.hash(password, 10)).pipe(
			switchMap((hashedPassword: string) => {
				const _user = new User();
				_user.email = email;
				_user.password = hashedPassword;
				_user.role = role;
				return from(this._usersRepository.save(_user));
			})
		);
	}

	findOne(query: FindUsersDto): Observable<User> {
		const { email } = query;
		this._logger.debug(`Searching user with email ${email}`);
		return from(
			this._usersRepository.findOne({
				where: { email },
				select: { email: true, password: true }
			})
		);
	}

	getIsAdminUser(request): Observable<boolean> {
		this._logger.debug(`Checking user has admin role`);
		return of(request?.user?.role === UserRoles.ADMIN);
	}
}
