import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContainersService } from './services/containers.service';
import { AddNewContainerDto } from './dto/add-new-container';
import { UpdateContainerDto } from './dto/update-container';

@Controller('containers')
export class ContainersController {
  constructor(private readonly containersService: ContainersService) {}

  @Post()
  create(@Body() container: AddNewContainerDto) {
    return this.containersService.addNewContainer(container);
  }

  @Get()
  getAllContainers() {
    return this.containersService.getAllContainers();
  }

  @Get(':id')
  getContainer(@Param('id') id: string) {
    return this.containersService.getOneContainer(+id);
  }

  @Patch(':id')
  updateContainer(@Param('id') id: string, @Body() container: UpdateContainerDto) {
    return this.containersService.updateContainer(+id, container);
  }

  @Delete(':id')
  removeContainer(@Param('id') id: string) {
    return this.containersService.removeContainer(+id);
  }
}
