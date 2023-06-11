import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from '../models/users.model';

@Entity('users', { schema: '' })
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column({ name: 'email', type: 'text', unique: true })
	email: string;

	@Column({ name: 'password', type: 'text' })
	password: string;

	@Column({ name: 'role', type: 'text' })
	role: UserRoles;

  //Metodo que asegura insertar emails en minusculas en la base de datos
	@BeforeInsert()
	checkFieldsBeforeInsert() {
		this.email = this.email.toLowerCase().trim();
	}

  //Metodo que asegura editar emails en minusculas en la base de datos
	@BeforeUpdate()
	checkFieldsBeforeUpdate() {
		this.checkFieldsBeforeInsert();
	}
}
