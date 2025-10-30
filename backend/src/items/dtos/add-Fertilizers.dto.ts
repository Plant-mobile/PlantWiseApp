import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class AddFertilizersDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
catagory: string;

  @IsString()
  @IsNotEmpty()
  img: string;

  @IsString()
  @IsNotEmpty()
  chemical_formula: string;

  @IsString()
  @IsNotEmpty()
  approximate_proportions: string;

  @IsString()
  @IsNotEmpty()
  solubility: string;

  @IsString()
  @IsNotEmpty()
  common_form: string;

  @IsString()
  @IsNotEmpty()
  indications: string;

  @IsString()
  @IsNotEmpty()
  application: string;
   @IsString()
  @IsNotEmpty()
  type: string;
 @IsString()
  @IsNotEmpty()
  symptoms:string;

  isSave:boolean;
}


