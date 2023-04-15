
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, MinLength, IsString, IsEnum} from "class-validator";
import { UserRoles } from "../models/users.model";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({description:'User email', example:'email@email'})
    email:string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty({description:'password', example:'12345678'})
    password: string;

    
    @IsNotEmpty()
    @IsEnum(UserRoles)
    @ApiProperty({description:'User role', example:'admin'})
    role: UserRoles;
}
