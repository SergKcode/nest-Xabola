import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Observable, from, map, switchMap } from 'rxjs';
import { FindUsersDto } from '../dto/find-users.dto';

@Injectable()
export class UsersService {
  private readonly _logger = new Logger(UsersService.name, { timestamp: true });

  constructor(
    @InjectRepository(User) private _usersRepository: Repository<User>,
  ) {}

  createUser(user: CreateUserDto): Observable<User> {
    const { email, password , role} = user;
    this._logger.debug(`Creating new user with email ${email}`);
    return from(bcrypt.hash(password, 10)).pipe(switchMap((hashedPassword:string)=>{
      const _user = new User();
      _user.email = email;
      _user.password = hashedPassword;
      _user.role=role
      return from(this._usersRepository.save(_user));
    }))
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

  public isAdmin(email: string): Observable<boolean> {
    return from(this._usersRepository.findOne({ where: { email } })).pipe(
      map((user) => user?.role === 'admin'),
    );
  }
}
