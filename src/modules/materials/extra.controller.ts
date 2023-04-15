import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExtrasService } from './services/extra.service';
import { CreateExtraDto } from './dto/create-extra.dto';
import { UpdateExtraDto } from './dto/update-extra.dto';

@Controller('extras')
export class ExtrasController {
  constructor(private readonly materialsService: ExtrasService) {}

  @Post()
  createExtra(@Body() extra: CreateExtraDto) {
    return this.materialsService.createExtra(extra);
  }

  @Get()
  getAllExtras() {
    return this.materialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(+id);
  }

  @Get(':type')
  getExtraByType(@Param('type') type: string) {
    return 'hola'
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialDto: UpdateExtraDto) {
    return this.materialsService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialsService.remove(+id);
  }
}
