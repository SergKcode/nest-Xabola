import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, MinLength, IsString} from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({description:'User email', example:'email@email'})
    email:string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
