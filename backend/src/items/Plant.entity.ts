import { Entity ,PrimaryGeneratedColumn,Column, ManyToOne} from "typeorm";

@Entity({name:'plants'})
export class Plant{
@PrimaryGeneratedColumn()    
id:number;
@Column()
name:string;
@Column()
Age:string;
@Column()
climate:string;
@Column()
substrate:string;
@Column()
img:string;
@Column()
temperatures:string;
@Column()
ProductionTime:string;
@Column()
Humidity:string;
@Column()
Profit:string;

@Column({ default: false })
isSave: boolean;

}