import { PartialType } from '@nestjs/mapped-types';
import { AddNewContainerDto } from './add-new-container';

export class UpdateContainerDto extends PartialType(AddNewContainerDto) {}
