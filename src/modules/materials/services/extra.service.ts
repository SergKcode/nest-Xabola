import { Injectable , Logger} from '@nestjs/common';
import { CreateExtraDto } from '../dto/create-extra.dto';
import { UpdateExtraDto } from '../dto/update-extra.dto';
import { from } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Extra } from '../entities/extras.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExtrasService {
  private readonly _logger = new Logger(ExtrasService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Extra) private _containersRepository: Repository<Extra>,
  ) {}


  createExtra(extra: CreateExtraDto) {
    this._logger.debug(`Creating new extra`);
    return from(this._containersRepository.save(extra));
  }

  findAll() {
    return `This action returns all materials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} material`;
  }

  update(id: number, updateMaterialDto: UpdateExtraDto) {
    return `This action updates a #${id} material`;
  }

  remove(id: number) {
    return `This action removes a #${id} material`;
  }
}
