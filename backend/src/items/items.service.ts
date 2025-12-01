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
  ) { }


  async addFertilizer(data: any, admin: User) {
    const fertilizer = this.fertilizersRepo.create({
      name: data.name,
      catagory: data.catagory,
      img: data.img,
      chemical_formula: data.chemical_formula,
      approximate_proportions: data.approximate_proportions,
      solubility: data.solubility,
      common_form: data.common_form,
      indications: data.indications,
      application: data.application,
      symptoms: data.symptoms,
      isSave: false,
      isDeleted: false,
    });

    return await this.fertilizersRepo.save(fertilizer);
  }


  async addPlant(data: any, admin: User) {
    const plant = this.plantsRepo.create({
      name: data.name,
      age: data.age,
      climate: data.climate,
      substrate: data.substrate,
      img: data.img,
      temperatures: data.temperatures,
      productionTime: data.productionTime,
      humidity: data.humidity,
      profit: data.profit,
      catagory: data.catagory,
      isSave: false,
      isDeleted: false,
    });

    return await this.plantsRepo.save(plant);
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

  async Delete(
    ids: number[],
    type: 'fertilizer' | 'plant'
  ): Promise<any> {
    let repo;

    if (type === 'fertilizer') {
      repo = this.fertilizersRepo;
    } else if (type === 'plant') {
      repo = this.plantsRepo;
    }

    return await repo.update(
      { id: In(ids) },
      { isDeleted: true },
    );
  }
  async unDelete(
    ids: number[],
    type: 'fertilizer' | 'plant'
  ): Promise<any> {
    let repo;

    if (type === 'fertilizer') {
      repo = this.fertilizersRepo;
    } else if (type === 'plant') {
      repo = this.plantsRepo;
    }

    return await repo.update(
      { id: In(ids) },
      { isDeleted: false },
    );
  }
  async Save(
    ids: number[],
    type: 'fertilizer' | 'plant'
  ): Promise<any> {
    let repo;

    if (type === 'fertilizer') {
      repo = this.fertilizersRepo;
    } else if (type === 'plant') {
      repo = this.plantsRepo;
    }

    return await repo.update(
      { id: In(ids) },
      { isSave: true },
    );
  }
  async unSave(
    ids: number[],
    type: 'fertilizer' | 'plant'
  ): Promise<any> {
    let repo;

    if (type === 'fertilizer') {
      repo = this.fertilizersRepo;
    } else if (type === 'plant') {
      repo = this.plantsRepo;
    }

    return await repo.update(
      { id: In(ids) },
      { isSave: false },
    );
  }

  async findAllDelete(type: String) {
    if (type === 'fertilizers')
      return this.fertilizersRepo.find({
        where: { isDeleted: true },
      });
    return this.plantsRepo.find({
      where: { isDeleted: true },
    });
  }
  async findUpdatedAfterDelete(date: Date, type: String) {
    if (type === 'fertilizers')
      return this.fertilizersRepo.find({
        where: [{ updatedAt: MoreThan(date) },
        { isDeleted: false },
        ],
      });
    return this.plantsRepo.find({
      where: [{ updatedAt: MoreThan(date) },
      { isDeleted: false },
      ],
    });
  }
}


