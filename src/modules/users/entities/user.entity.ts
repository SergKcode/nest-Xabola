import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users', {schema:''})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column('text',{unique:true})
    email:string

    @Column('text',)
    password:string

}
