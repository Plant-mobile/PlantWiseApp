import { 
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column
} from "typeorm";
import { User } from "src/users/user.entity";

export enum ItemType {
  PLANT = "plant",
  FERTILIZER = "fertilizer",
}

@Entity({ name: 'save_item' })
export class SaveItem {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.saveItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  item_id: number;

  @Column({
    type: "enum",
    enum: ItemType,
  })
  item_type: ItemType;
}
