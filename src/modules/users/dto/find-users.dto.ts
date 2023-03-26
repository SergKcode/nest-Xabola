
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail} from "class-validator";

export class FindUsersDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({description:'User email', example:'email@email'})
    email:string
}
