import { Entity ,PrimaryGeneratedColumn,Column, ManyToOne} from "typeorm";

@Entity({name:'plants'})
export class Plant{
@PrimaryGeneratedColumn()    
id:number;
@Column()
name:string;
@Column()
age:string;
@Column()
climate:string;
@Column()
substrate:string;
@Column()
img:string;
@Column()
temperatures:string;
@Column()
productionTime:string;
@Column()
humidity:string;
@Column()
profit:string;
@Column()
catagory:string;

@Column({ default: false })
isSave: boolean;

}