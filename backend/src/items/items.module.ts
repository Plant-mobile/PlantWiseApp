// src/items/items.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Fertilizer } from './Fertilizers.entity';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Plant } from './Plant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fertilizer, User,Plant]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') || 'defaultSecret',
        signOptions: { 
          expiresIn: (config.get<string>('JWT_EXPIRES_IN') || '1h') as
            | '1s'
            | '60s'
            | '1m'
            | '10m'
            | '1h'
            | '24h'
            | '7d',
        },
      }),
    }),
    UsersModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
