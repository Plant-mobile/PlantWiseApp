import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { FertilizersModule } from './Fertilizers/Fertilizers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/products.entity';
import { Fertilizer } from './Fertilizers/Fertilizers.entity';
import { User } from './users/user.entity';
import { Review } from './reviews/review.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),

    ProductsModule,
    UsersModule,
    ReviewsModule,
    FertilizersModule,

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // طباعة القيم القادمة من .env
        const dbHost = config.get<string>('DB_HOST') || 'aws-1-ap-south-1.pooler.supabase.com';
        const dbPort = config.get<number>('DB_PORT') || 5432;
        const dbUser = config.get<string>('DB_USERNAME');
        const dbPass = config.get<string>('DB_PASSWORD');
        const dbName = config.get<string>('DB_DATABASE');

        

        return {
          type: 'postgres',
          host: dbHost,
          port: dbPort,
          username: dbUser,
          password: dbPass,
          database: dbName,
          synchronize: process.env.NODE_ENV !== 'production',
          entities: [Product, User, Review, Fertilizer],
          ssl: { rejectUnauthorized: false },
        };
      },
    }),
  ],
})
export class AppModule {}
