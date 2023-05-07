import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExtrasService } from './services/extra.service';
import { CreateExtraDto } from './dto/create-extra.dto';
import { UpdateExtraDto } from './dto/update-extra.dto';
import { ExtraType } from './models/extra.model';
import { Observable } from 'rxjs';
import { Extra } from './entities/extras.entity';

@Controller('extras')
export class ExtrasController {
  constructor(private readonly _extrasService: ExtrasService) {}

  @Post()
  createExtra(@Body() extra: CreateExtraDto) {
    return this._extrasService.createExtra(extra);
  }

  @Get()
  getAllExtras() {
    return this._extrasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._extrasService.findOne(+id);
  }

  @Get('type/:idType')
  getExtraByType(@Param('idType') type: ExtraType) :Observable<Extra[]>{
    return this._extrasService.getExtraByType(type)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialDto: UpdateExtraDto) {
    return this._extrasService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._extrasService.remove(+id);
  }
}
