import { Injectable } from '@nestjs/common';
import { CreateHouseModuleDto } from './dto/create-house-module.dto';
import { UpdateHouseModuleDto } from './dto/update-house-module.dto';

@Injectable()
export class HouseModulesService {
  create(createHouseModuleDto: CreateHouseModuleDto) {
    return 'This action adds a new houseModule';
  }

  findAll() {
    return `This action returns all houseModules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} houseModule`;
  }

  update(id: number, updateHouseModuleDto: UpdateHouseModuleDto) {
    return `This action updates a #${id} houseModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} houseModule`;
  }
}
