import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductTypes } from './product-type.entity';

@Entity('products', { schema: '' })
export class Products {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'name', type: 'text', unique: true })
	name: string;

	@Column({ name: 'value', type: 'float' })
	value: number;

	@Column({ name: 'image_url', type: 'text', nullable: true })
	image: string;

	@Column({ name: 'size', type: 'float', nullable: true })
	size: number;

	@Column({ name: 'file_name', type: 'text', nullable: true })
	fileName: string;

	@ManyToOne(() => ProductTypes, (type) => type.products, { eager: true })
	@JoinColumn({ name: 'type_id', referencedColumnName: 'id' })
	typeId: ProductTypes;
}
