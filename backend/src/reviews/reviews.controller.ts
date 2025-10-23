import { Controller, Get } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
@Controller()
export class ReviewsController{
  constructor(
    private readonly reviewsService:ReviewsService,
  ){}
  @Get("/api/reviews")
  public getAllReviews(){
    return[{id:1,rating:2,Comment:"good"},{id:2,rating:32,Comment:"gjood"}]
  }  
}