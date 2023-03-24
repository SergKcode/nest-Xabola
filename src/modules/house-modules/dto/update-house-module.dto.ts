import { PartialType } from '@nestjs/mapped-types';
import { CreateHouseModuleDto } from './create-house-module.dto';

export class UpdateHouseModuleDto extends PartialType(CreateHouseModuleDto) {}
