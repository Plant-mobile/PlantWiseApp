import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThan, Repository } from 'typeorm';
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


  async addFertilizer(dto: AddFertilizersDto, admin: User) {
    const fertilizer = this.fertilizersRepo.create({ ...dto });
    return this.fertilizersRepo.save(fertilizer);
  }

  async addPlant(dto: AddPlantsDto, admin: User) {
    const plant = this.plantsRepo.create({ ...dto });
    return this.plantsRepo.save(plant);
  }

  async findAllFertilizers(): Promise<Fertilizer[]> {
    return this.fertilizersRepo.find({ order: { id: 'ASC' } });
  }

  async findAllPlants(): Promise<Plant[]> {
    return this.plantsRepo.find({ order: { id: 'ASC' } });
  }

  async findUpdatedAfter(date: Date, type: string) {
    if (type === 'fertilizers')
      return this.fertilizersRepo.find({
        where: [{ updatedAt: MoreThan(date) },
        { isDeleted: true },
        ],
      });
    return this.plantsRepo.find({
      where: [{ updatedAt: MoreThan(date) },
      { isDeleted: true },
      ],

    });
  }

  async findLatestUpdateTime(type: String) {
    const latest = type == "fertilizers" ?
      await this.fertilizersRepo.find({
        order: { updatedAt: 'DESC' },
        take: 1,
      }) :
      await this.plantsRepo.find({
        order: { updatedAt: 'DESC' },
        take: 1,
      });
    return latest[0]?.updatedAt ?? new Date();
  }

  async isDelete(ids: number[]): Promise<any> {
    return await this.fertilizersRepo.update(
      { id: In(ids) },
      { isDeleted: true },
    );
  }

  async unDelete(ids: number[]): Promise<any> {
        return await this.fertilizersRepo.update(
      { id: In(ids) },
      { isDeleted: false },
    );
  }


  async findAllFertilizersIsDelete(): Promise<Fertilizer[]> {
    return this.fertilizersRepo.find({
      where: { isDeleted: true },
      order: { id: 'ASC' },
    });
  }
  async findUpdatedFertilizersAfterIsDelete(date: Date): Promise<Fertilizer[]> {
    return this.fertilizersRepo.find({
      where: {
        updatedAt: MoreThan(date),
        isDeleted: false,
      },
      order: { id: 'ASC' },
    });
  }

}


