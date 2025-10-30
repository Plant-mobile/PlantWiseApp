import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,ManyToOne } from "typeorm";
import{CURRENT_TIMESTAMP} from '../utils/constants';

import { User } from "src/users/user.entity";
@Entity({name:'reviews'})
export class Review{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:'int'})
    rating:number;
    @Column()
    comment:string;
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
createdAt: Date;

@UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
updatedAt: Date;
   
}