import { Injectable } from '@nestjs/common';
import { AddFertilizersDto } from './dtos/add-Fertilizers.dto';
import { Fertilizer } from './Fertilizers.entity'; 
import { User } from 'src/users/user.entity';       
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class FertilizersService{
constructor(
    @InjectRepository(Fertilizer)
    private readonly fertilizersRepo: Repository<Fertilizer>,

){}
async addFertilizer(dto: AddFertilizersDto, admin: User): Promise<Fertilizer> {
  const fertilizer = this.fertilizersRepo.create({
    ...dto,
    user: admin, 
  });
  return this.fertilizersRepo.save(fertilizer);
}
}