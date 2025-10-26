import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/products.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {Fertilizer} from "./Fertilizers/Fertilizers.entity"
import { User } from './users/user.entity';
import { Review } from './reviews/review.entity';
import { config } from 'node:process';
import { FertilizersModule } from './Fertilizers/Fertilizers.module';
@Module({imports:[ProductsModule,UsersModule,ReviewsModule,FertilizersModule,
  TypeOrmModule.forRootAsync({
 inject:[ConfigService],
 useFactory:(config:ConfigService)=>{
  return{ type:"postgres"
   ,username:"postgres.mjaaxtdkfozyvarrvter"
   ,database:"postgres"
   ,password:config.get<string>("DB_PASSWORD")
   ,port:5432,
   host:"aws-1-ap-south-1.pooler.supabase.com"
   ,synchronize:process.env.NODE_ENV!=="production"
   ,entities:[Product,User,Review,Fertilizer],
   ssl: { rejectUnauthorized: false }, }
 }
}
  
),ConfigModule.forRoot({
  isGlobal:true,
  envFilePath: `.env.${process.env.NODE_ENV}`,
})]

})
export class AppModule {}