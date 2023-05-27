import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('containers', { schema: '' })
export class Container {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'text', unique: true })
  name: string;

  @Column({ name: 'size', type: 'float' })
  size: number;

  @Column({ name: 'value', type: 'float' })
  value: number;

  @Column({ name: 'image', type: 'text' , nullable:true})
  image: string;
}
