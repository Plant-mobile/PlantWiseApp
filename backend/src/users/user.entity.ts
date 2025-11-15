import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { CURRENT_TIMESTAMP } from '../utils/constants';
import { Fertilizer } from "../items/Fertilizers.entity"

import { RefreshToken } from "../users/refresh_token.entity"; // عدّل المسار حسب مشروعك

// src/users/user.entity.ts

@Entity({ name: 'users' })
export class User {
   @PrimaryGeneratedColumn()
   id: number;
   @Column({ type: "varchar", length: "150", nullable: false })
   username: string;
   @Column({ type: "varchar", length: "250", unique: true })
   email: string;
   @Column()
   password: string;
   @Column({ type: "boolean", default: false })
   isAdmin: boolean;
   @OneToMany(() => RefreshToken, token => token.user)
refreshTokens: RefreshToken[];
   //  @Column({ type: 'varchar', nullable: true })
   //  recovery_token: string | null;

   //  @Column({ type: 'timestamp', nullable: true })
   //  recovery_sent_at: Date | null;


   // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   // createdAt: Date;

   // @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
   // updatedAt: Date;


}

