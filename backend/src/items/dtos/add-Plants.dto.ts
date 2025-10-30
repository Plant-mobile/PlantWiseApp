import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class AddPlantsDto {
 @IsString()
  @IsNotEmpty()
  name:string;
  @IsString()
  @IsNotEmpty()
  Age:string;
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
  ProductionTime:string;
  @IsString()
  @IsNotEmpty()
  Humidity:string;
  @IsString()
  @IsNotEmpty()
  Profit:string;
   @IsString()
  @IsNotEmpty()
  type: string;
}