import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fertilizer } from './Fertilizers.entity';
import { Plant } from "./Plant.entity";
import { User } from 'src/users/user.entity';
import { AddFertilizersDto } from './dtos/add-Fertilizers.dto';
import { AddPlantsDto } from "./dtos/add-Plants.dto";

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Fertilizer)
    private readonly fertilizersRepo: Repository<Fertilizer>,

    @InjectRepository(Plant)
    private readonly plantsRepo: Repository<Plant>,

    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) { }

  // 🌿 سماد
  async addFertilizer(dto: AddFertilizersDto, admin: User) {
    const fertilizer = this.fertilizersRepo.create({ ...dto });
    return this.fertilizersRepo.save(fertilizer);
  }

  // 🌱 نبتة
  async addPlant(dto: AddPlantsDto, admin: User) {
    const plant = this.plantsRepo.create({ ...dto });
    return this.plantsRepo.save(plant);

  }

  findAllFertilizers(): Promise<Fertilizer[]> {
    return this.fertilizersRepo.find();
  }
  findAllPlants(): Promise<Plant[]> {
    return this.plantsRepo.find();
  }

}
