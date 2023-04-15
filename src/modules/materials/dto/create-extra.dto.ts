import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, MinLength, IsString, IsPositive, IsNumber, isString, IsEnum} from "class-validator";
import { ExtraType } from "../models/extra.model";

export class CreateExtraDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:'Material name', example:'Techo Acero'})
    name:string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({description:'Value material', example:'98000'})
    @IsPositive()
    value: number;

    @IsString()
    @ApiProperty({ description:'image', type: 'string', format: 'binary' })
    image: string;

    @IsNotEmpty()
    @IsEnum(ExtraType)
    @ApiProperty({description:'Type of extra', example:'EX'})
    type: ExtraType;
}
