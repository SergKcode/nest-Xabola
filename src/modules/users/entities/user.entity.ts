import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "../models/users.model";

@Entity('users', {schema:''})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column({name:'email', type:'text',unique:true})
    email:string

    @Column({name:'password', type:'text'})
    password:string

    @Column({name:'role', type:'text'})
    role:UserRoles

}
