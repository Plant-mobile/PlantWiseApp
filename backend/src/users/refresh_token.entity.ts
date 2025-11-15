import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";

@Entity({ name: "refresh_tokens" })
export class RefreshToken {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.refreshTokens, { onDelete: "CASCADE" })
  user: User;   
  @Column({ type: "varchar", length: 250, unique: true })
  token: string;

  @Column({ type: "timestamp" })
  expiresAt: Date;
}
