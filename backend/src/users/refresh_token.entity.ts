import { Column, Entity, PrimaryGeneratedColumn,JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "refresh_tokens" })
export class RefreshToken {

  @PrimaryGeneratedColumn()
  id: number;

@ManyToOne(() => User, (user) => user.refreshToken, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" }) 
user: User;
  
  @Column({ type: "varchar", length: 250, unique: true })
  token: string;

  @Column({ type: "timestamp" })
  expiresAt: Date;
}
