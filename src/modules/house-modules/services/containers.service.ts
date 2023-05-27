import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AddNewContainerDto } from '../dto/add-new-container';
import { UpdateContainerDto } from '../dto/update-container';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Container } from '../entities/containers.entity';
import { Observable, catchError, from, switchMap } from 'rxjs';
import { errorMonitor } from 'events';
import { UploadImagesService } from 'src/shared/service/upload-images/upload-images.service';

@Injectable()
export class ContainersService {
  private readonly _logger = new Logger(ContainersService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Container)
    private _containersRepository: Repository<Container>,
    private _uploadImagesService: UploadImagesService,
  ) {}

  addNewContainer(
    values: AddNewContainerDto,
    image: Express.Multer.File,
  ): Observable<any> {
    this._logger.debug(`Creating new container`);

    return this._uploadImagesService.saveImage(image).pipe(
      switchMap((image) => {
        if(!image){
          throw new HttpException(
            { message: `No se añadió ninguna imagen` },
            HttpStatus.BAD_REQUEST,
          );
        }
        const container = Object.assign({}, values, { image });
        return from(this._containersRepository.save(container));
      }),
    );
  }

  getAllContainers(): Observable<Container[]> {
    this._logger.debug(`Getting all containers`);
    return from(this._containersRepository.find()).pipe(
      catchError((error) => {
        this._logger.error(`Error getting all containers`, error);
        throw new HttpException(
          { message: `Ocurrió un error: ${error}` },
          HttpStatus.BAD_REQUEST,
        );
      }),
    );
  }

  getOneContainer(id: string): Observable<Container> {
    this._logger.debug(`getting container by id ${id}`);
    return from(this._containersRepository.findOne({ where: { id } }));
  }

  updateContainer(
    id: string,
    containerDto: UpdateContainerDto,
  ): Observable<any> {
    const { name, size, value, image } = containerDto;
    this._logger.debug(`Updating container with Id ${id}`);
    return from(this.getOneContainer(id)).pipe(
      switchMap((container) => {
        if (!container) {
          if (!container) {
            throw new HttpException(
              { message: `Contenedor con id: ${id} , no ha encontrado` },
              HttpStatus.NOT_FOUND,
            );
          }
        }
        return from(
          this._containersRepository
            .createQueryBuilder()
            .update(Container)
            .set({
              ...(name && { name }),
              ...(size && { size }),
              ...(value && { value }),
              ...(image && { image }),
            })
            .where('id = :id', { id })
            .execute(),
        );
      }),
    );
  }

  removeContainer(id: string): Observable<any> {
    this._logger.debug(`Removing container with Id ${id}`);
    return from(this._containersRepository.delete(id));
  }
}
