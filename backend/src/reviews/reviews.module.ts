import { Module } from "@nestjs/common";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import {Review} from "./review.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({controllers:[ReviewsController],
    providers:[ReviewsService],
    imports:[TypeOrmModule.forFeature([Review])]})
export class ReviewsModule{}