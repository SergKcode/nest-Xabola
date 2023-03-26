import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Observable, from } from 'rxjs';
import { FindUsersDto } from './dto/find-users.dto';

@Injectable()
export class UsersService {
  private readonly _logger = new Logger(UsersService.name, { timestamp: true });

  constructor(
    @InjectRepository(User) private _usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Observable<User> {
    const { email, password } = createUserDto;
    this._logger.debug(`Creating new user with email ${email}`);
    const hashedPassword = bcrypt.hash(password, 10);
    const user = new User();
    user.email = email;
    user.password = hashedPassword;

    return from(this._usersRepository.save(user));
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(query: FindUsersDto): Observable<User> {
    const { email } = query;
    this._logger.debug(`Searching user with email ${email}`);
    return from(this._usersRepository.findOne({ where: { email } }));
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
