import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsPositive,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Material name', example: 'Techo Acero' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Value material', example: '98000' })
  @IsPositive()
  value: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'Container size', example: '32' })
  size?: number;

/*   @IsString()
  @IsOptional()
  @ApiProperty({ description: 'image', type: 'string' })
  image?: string; */

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Type of product id', example: '138djdosld' })
  typeId: string;
}
