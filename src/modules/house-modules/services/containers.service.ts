import { Injectable, Logger } from '@nestjs/common';
import { AddNewContainerDto } from '../dto/add-new-container';
import { UpdateContainerDto } from '../dto/update-container';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Container } from '../entities/containers.entity';
import { Observable, from, switchMap } from 'rxjs';

@Injectable()
export class ContainersService {
  private readonly _logger = new Logger(ContainersService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Container) private _containersRepository: Repository<Container>,
  ) {}

  addNewContainer(newContainer: AddNewContainerDto): Observable<any> {
    this._logger.debug(`Creating new container`);
    return from(this._containersRepository.save(newContainer));
  }

  getAllContainers(): Observable<any> {
    this._logger.debug(`Gettin all containers`);
    return from(this._containersRepository.createQueryBuilder().getMany());
  }

  getOneContainer(id: number): Observable<any> {
    this._logger.debug(`getting container by id ${id}`);
    return from(this._containersRepository.findOne({ where: { id } }));
  }

  updateContainer(
    id: number,
    containerDto: UpdateContainerDto,
  ): Observable<any> {
    const { name, size, value, image } = containerDto;
    this._logger.debug(`Updating container with Id ${id}`);
    return from(this.getOneContainer(id)).pipe(
      switchMap((container) => {
        if (!container) {
          /*         throw new NotFoundException(`El container con el ID '${id}' no fue encontrado.`); */
        }
        return from(
          this._containersRepository
            .createQueryBuilder()
            .update(Container)
            .set({
              ...(name && { name }),
              ...(name && { size }),
              ...(name && { value }),
              ...(name && { image }),
            })
            .where('id = :id', { id })
            .execute(),
        );
      }),
    );
  }

  removeContainer(id: number): Observable<any> {
    this._logger.debug(`Removing container with Id ${id}`);
    return from(this._containersRepository.delete(id));
  }
}
