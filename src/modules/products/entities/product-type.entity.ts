import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductTypeCode } from '../models/products.model';
import { Products } from './product.entity';


@Entity('product_types', { schema: '' })
export class ProductTypes {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', type: 'text', unique: true })
    name: string;

    @Column({
        name: 'type_code',
        type: 'enum',
        enum: ProductTypeCode,
    })
    typeCode: ProductTypeCode;

    @OneToMany(()=> Products, (product)=>product.id)
    products:Products[]
}


