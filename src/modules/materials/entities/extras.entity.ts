import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ExtraType } from '../models/extra.model';

@Entity('extra', { schema: '' })
export class Extra {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'name', type: 'text', unique: true })
  name: string;

  @Column({ name: 'value', type: 'float' })
  value: number;

  @Column({ name: 'image', type: 'text',  nullable:true })
  image: string;

  @Column({
    type: 'enum',
    enum: ExtraType,
  })
  type: ExtraType;

}
