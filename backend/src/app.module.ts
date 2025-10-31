import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {Fertilizer} from "./items/Fertilizers.entity";
import { User } from './users/user.entity';
import { Review } from './reviews/review.entity';
import { config } from 'node:process';
import { Plant } from './items/Plant.entity';


@Module({imports:[UsersModule,ReviewsModule,ItemsModule, 
  TypeOrmModule.forRootAsync({
 inject:[ConfigService],
 useFactory:(config:ConfigService)=>{
  return{ type:"postgres"
   ,username:"postgres.mjaaxtdkfozyvarrvter"
   ,database:"postgres"
   ,password:"Admin@#123Plant"
   ,port:5432,
   host:"aws-1-ap-south-1.pooler.supabase.com"
   ,synchronize:process.env.NODE_ENV!=="production"
   ,entities:[User,Review,Fertilizer,Plant],
   ssl: { rejectUnauthorized: false }, }
 }
}
  
),ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
})
]

})
export class AppModule {}
