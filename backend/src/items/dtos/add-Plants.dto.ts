import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class AddPlantsDto {
 @IsString()
  @IsNotEmpty()
  name:string;
  @IsString()
  @IsNotEmpty()
  age:string;
 @IsString()
  @IsNotEmpty()
  climate:string;
  @IsString()
  @IsNotEmpty()
substrate:string;
  @IsString()
  @IsNotEmpty()
  img:string;
 @IsString()
  @IsNotEmpty()
  temperatures:string;
  @IsString()
  @IsNotEmpty()
  productionTime:string;
  @IsString()
  @IsNotEmpty()
  humidity:string;
  @IsString()
  @IsNotEmpty()
  profit:string;
   @IsString()
  @IsNotEmpty()
  type: string;
@IsString()
  @IsNotEmpty()
  catagory:string;
}