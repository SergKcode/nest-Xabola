import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, MinLength, IsString, IsPositive, IsNumber, isString} from "class-validator";

export class AddNewContainerDto {
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:'Xabola house name', example:'Xabola M'})
    name:string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({description:'Container size', example:'32'})
    size: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({description:'Value od the container', example:'98000'})
    @IsPositive()
    value: number;

    @IsString()
    @ApiProperty({ description:'image', type: 'string', format: 'binary' })
    image: string;
}

