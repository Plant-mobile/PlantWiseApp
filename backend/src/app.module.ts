import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/products.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './users/user.entity';
import { Review } from './reviews/review.entity';
import { config } from 'node:process';
@Module({imports:[ProductsModule,UsersModule,ReviewsModule,
  TypeOrmModule.forRootAsync({
 inject:[ConfigService],
 useFactory:(config:ConfigService)=>{
  return{ type:"postgres"
   ,username:config.get<string>("DB_USERNAME")
   ,database:config.get<string>("DB_DATABASE")
   ,password:config.get<string>("DB_PASSWORD")
   ,port:config.get<number>("DB_PORT"),
   host:"localhost"
   ,synchronize:process.env.NODE_ENV!=="production"
   ,entities:[Product,User,Review]}
 }
}
  
),ConfigModule.forRoot({
  isGlobal:true,
  envFilePath: `.env.${process.env.NODE_ENV}`,
})]

})
export class AppModule {}
