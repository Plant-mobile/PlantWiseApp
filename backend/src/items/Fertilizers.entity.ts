import { Entity ,PrimaryGeneratedColumn,Column, ManyToOne,UpdateDateColumn} from "typeorm";
import { User } from "src/users/user.entity";

@Entity({name:'fertilizers'})
export class Fertilizer{
@PrimaryGeneratedColumn()    
id:number;
@Column()
name:string;
@Column()
catagory:string;
@Column()
img:string;
@Column()
chemical_formula:string;
@Column()
approximate_proportions:string;
@Column()
solubility:string;
@Column()
common_form:string;
@Column()
indications:string;
@Column()
application:string;
@Column()
symptoms:string;
@Column({ default: false })
isSave:boolean;
@UpdateDateColumn({ type: 'timestamptz' })
updatedAt: Date;

}