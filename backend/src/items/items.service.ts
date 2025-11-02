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
  ) {}

  // 🌿 إضافة سماد جديد
  async addFertilizer(dto: AddFertilizersDto, admin: User) {
    const fertilizer = this.fertilizersRepo.create({ ...dto });
    return this.fertilizersRepo.save(fertilizer);
  }

  // 🌱 إضافة نبتة جديدة
  async addPlant(dto: AddPlantsDto, admin: User) {
    const plant = this.plantsRepo.create({ ...dto });
    return this.plantsRepo.save(plant);
  }

  // -------------------------------
  // 🌿 الأسمدة
  // -------------------------------

  async findAllFertilizers(): Promise<Fertilizer[]> {
    return this.fertilizersRepo.find({ order: { id: 'ASC' } });
  }

  // ✅ استعلام حسب آخر تحديث
  async findUpdatedFertilizers(since: Date, lastId = 0, limit = 100): Promise<Fertilizer[]> {
    return this.fertilizersRepo
      .createQueryBuilder('f')
      .where(
        '(f."updatedAt" > :since) OR (f."updatedAt" = :since AND f.id > :lastId)',
        { since: since.toISOString(), lastId },
      )
      .orderBy('f."updatedAt"', 'ASC')
      .addOrderBy('f.id', 'ASC')
      .limit(limit)
      .getMany();
  }

  // ✅ آخر تحديث في جدول الأسمدة
  async findLatestFertilizerUpdate() {
    const latest = await this.fertilizersRepo.find({
      order: { updatedAt: 'DESC', id: 'DESC' },
      take: 1,
    });
    if (!latest.length) return null;
    return { updatedAt: latest[0].updatedAt, lastId: latest[0].id };
  }

  // -------------------------------
  // 🌱 النباتات
  // -------------------------------

  async findAllPlants(): Promise<Plant[]> {
    return this.plantsRepo.find({ order: { id: 'ASC' } });
  }

  // ✅ استعلام حسب آخر تحديث
  async findUpdatedPlants(since: Date, lastId = 0, limit = 100): Promise<Plant[]> {
    return this.plantsRepo
      .createQueryBuilder('p')
      .where(
        '(p."updatedAt" > :since) OR (p."updatedAt" = :since AND p.id > :lastId)',
        { since: since.toISOString(), lastId },
      )
      .orderBy('p."updatedAt"', 'ASC')
      .addOrderBy('p.id', 'ASC')
      .limit(limit)
      .getMany();
  }

  // ✅ آخر تحديث في جدول النباتات
  async findLatestPlantUpdate() {
    const latest = await this.plantsRepo.find({
      order: { updatedAt: 'DESC', id: 'DESC' },
      take: 1,
    });
    if (!latest.length) return null;
    return { updatedAt: latest[0].updatedAt, lastId: latest[0].id };
  }
}
