import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Fertilizer } from "./items/Fertilizers.entity";
import { User } from './users/user.entity';
import { config } from 'node:process';
import { Plant } from './items/Plant.entity';


@Module({
  imports: [UsersModule, ItemsModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: 'aws-1-ap-south-1.pooler.supabase.com', // نفس المضيف
          port: 6543, // المنفذ الخاص بـ Pooler
          username: 'postgres.mjaaxtdkfozyvarrvter',
          password: 'Admin@#123Plant',
          database: 'postgres',
          ssl: { rejectUnauthorized: false },
          synchronize: process.env.NODE_ENV !== "production"
          , entities: [User,  Fertilizer, Plant],
          extra: {
            max: 200,
          },
        }
      }
    }

    ), ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    })
  ]

})
export class AppModule { }
