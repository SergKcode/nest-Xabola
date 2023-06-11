import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ProductTypeCode } from "../models/products.model";

export class CreateProductTypesDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:'nombre del tipo', example:'Autosuficiencia'})
    name:string
    
    @IsNotEmpty()
    @IsEnum(ProductTypeCode)
    @ApiProperty({description:'Type of product', example:'EX'})
    typeCode: ProductTypeCode;
}
