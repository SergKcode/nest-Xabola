import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContainersService } from './services/containers.service';
import { AddNewContainerDto } from './dto/add-new-container';
import { UpdateContainerDto } from './dto/update-container';
import { Observable } from 'rxjs';
import { Container } from './entities/containers.entity';
import { IsAdminGuard } from 'src/shared/guards/isAdmin.guard';

@Controller('containers')
export class ContainersController {
  constructor(private readonly containersService: ContainersService) {}

  @Post()
 /*  @UseGuards(IsAdminGuard) */
  create(@Body() container: AddNewContainerDto) {
    return this.containersService.addNewContainer(container);
  }

  @Get()
  getAllContainers():Observable<Container[]> {
    return this.containersService.getAllContainers();
  }

  @Get(':id')
  getContainer(@Param('id') id: string) :Observable<Container>{
    return this.containersService.getOneContainer(id);
  }

  @Patch(':id')
 /*  @UseGuards(IsAdminGuard) */
  updateContainer(@Param('id') id: string, @Body() container: UpdateContainerDto) {
    return this.containersService.updateContainer(id, container);
  }

  @Delete(':id')
/*   @UseGuards(IsAdminGuard) */
  removeContainer(@Param('id') id: string) {
    return this.containersService.removeContainer(id);
  }
}
