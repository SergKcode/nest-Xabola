import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ExtrasService } from './services/extra.service';
import { CreateExtraDto } from './dto/create-extra.dto';
import { UpdateExtraDto } from './dto/update-extra.dto';
import { ExtraType } from './models/extra.model';
import { Observable } from 'rxjs';
import { Extra } from './entities/extras.entity';
import { IsAdminGuard } from 'src/shared/guards/isAdmin.guard';

@Controller('extras')
export class ExtrasController {
  constructor(private readonly _extrasService: ExtrasService) {}

  @Post()
  @UseGuards(IsAdminGuard)
  createExtra(@Body() extra: CreateExtraDto) {
    return this._extrasService.createExtra(extra);
  }

  @Get()
  getAllExtras() {
    return this._extrasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id)
    return this._extrasService.findOne(id);
  }

  @Get('type/:idType')
  getExtraByType(@Param('idType') type: ExtraType): Observable<Extra[]> {
    return this._extrasService.getExtraByType(type);
  }

  @Patch(':id')
  @UseGuards(IsAdminGuard)
  update(@Param('id') id: string, @Body() updateMaterialDto: UpdateExtraDto) {
    return this._extrasService.update(id, updateMaterialDto);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  remove(@Param('id') id: string) {
    return this._extrasService.remove(id);
  }
}
