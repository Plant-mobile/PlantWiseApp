import { Controller,Get ,Post,Body, Req} from "@nestjs/common";
import { FertilizersService } from "./Fertilizers.service";
import{AddFertilizersDto} from "./dtos/add-Fertilizers.dto"
import {AuthRolesGuard} from "../users/guards/auth-roles.guard"
import {Roles} from "../users/decorators/user-role.decorator"
import { UseGuards } from "@nestjs/common";
@Controller("api/Fertilizers")
export class FertilizersController{
  constructor(private readonly fertilizersService: FertilizersService) {}

@Post()   
@UseGuards(AuthRolesGuard)
@Roles(true) 
async addFertilizer(@Body() dto: AddFertilizersDto, @Req() req) {
  const admin = req.user;
  return this.fertilizersService.addFertilizer(dto, admin);

    
}    

}
