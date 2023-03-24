import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HouseModulesService } from './house-modules.service';
import { CreateHouseModuleDto } from './dto/create-house-module.dto';
import { UpdateHouseModuleDto } from './dto/update-house-module.dto';

@Controller('house-modules')
export class HouseModulesController {
  constructor(private readonly houseModulesService: HouseModulesService) {}

  @Post()
  create(@Body() createHouseModuleDto: CreateHouseModuleDto) {
    return this.houseModulesService.create(createHouseModuleDto);
  }

  @Get()
  findAll() {
    return this.houseModulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseModulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseModuleDto: UpdateHouseModuleDto) {
    return this.houseModulesService.update(+id, updateHouseModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseModulesService.remove(+id);
  }
}
