import { Entity ,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,OneToMany, ManyToOne} from "typeorm";
import{CURRENT_TIMESTAMP} from '../utils/constants';
import{Review} from "../reviews/review.entity";
import { User } from "src/users/user.entity";

@Entity({name:'products'})
export class Product{
@PrimaryGeneratedColumn()    
id:number;
@Column()
title:string;
@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
createdAt: Date;

@UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
updatedAt: Date;

@OneToMany(() =>Review,(review) =>review.prduct)
reviews:Review[];
@ManyToOne(() =>User,(user) =>user.products)
user:User;
}