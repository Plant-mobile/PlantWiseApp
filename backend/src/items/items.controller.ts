import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
  Req,
  UseGuards,
  Get,
  Query, // 👈 نضيف هذا
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { ItemsService } from './items.service';
import { User } from 'src/users/user.entity';
import { AuthRolesGuard } from '../users/guards/auth-roles.guard';
import { Roles } from '../users/decorators/user-role.decorator';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('upload')
  @Roles(true)
  @UseGuards(AuthRolesGuard)
  @UseInterceptors(FileInterceptor('img', { storage: multer.memoryStorage() }))
  async uploadItem(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() req,
  ) {
    const { type } = body;

    if (!type) throw new BadRequestException('type is required');

    const folderPath = `./public/assets/${type}`;
    if (!fs.existsSync(folderPath)) {
      throw new BadRequestException('مجلد التحميل غير موجود');
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = `${folderPath}/${fileName}`;
    fs.writeFileSync(filePath, file.buffer);

    const imageUrl = `http://localhost:5000/assets/${type}/${fileName}`;
    const admin: User = req.user;

    switch (type) {
      case 'Fertilizers':
        return this.itemsService.addFertilizer({ ...body, img: imageUrl }, admin);
      case 'Plant':
        return this.itemsService.addPlant({ ...body, img: imageUrl }, admin);
      default:
        throw new BadRequestException('نوع العنصر غير معروف');
    }
  }

  // ✅ تعديل GET: getFertilizers
  @Get('getFertilizers')
  async getAllFertilizers(
    @Query('since') since?: string,
    @Query('lastId') lastId?: string,
    @Query('limit') limit?: string,
  ) {
    const parsedSince = since ? new Date(since) : null;
    const parsedLastId = lastId ? parseInt(lastId, 10) : 0;
    const parsedLimit = limit ? Math.min(parseInt(limit, 10), 500) : 200;

    const fertilizers = parsedSince
      ? await this.itemsService.findUpdatedFertilizers(parsedSince, parsedLastId, parsedLimit)
      : await this.itemsService.findAllFertilizers();

    const latest = await this.itemsService.findLatestFertilizerUpdate();

    return {
      fertilizers,
      last_updated: latest ? latest.updatedAt.toISOString() : new Date().toISOString(),
      last_id: latest ? latest.lastId : (fertilizers.length ? fertilizers[fertilizers.length - 1].id : 0),
      count: fertilizers.length,
    };
  }

  // ✅ تعديل GET: getPlants
  @Get('getPlants')
  async getAllPlants(
    @Query('since') since?: string,
    @Query('lastId') lastId?: string,
    @Query('limit') limit?: string,
  ) {
    const parsedSince = since ? new Date(since) : null;
    const parsedLastId = lastId ? parseInt(lastId, 10) : 0;
    const parsedLimit = limit ? Math.min(parseInt(limit, 10), 500) : 200;

    const plants = parsedSince
      ? await this.itemsService.findUpdatedPlants(parsedSince, parsedLastId, parsedLimit)
      : await this.itemsService.findAllPlants();

    const latest = await this.itemsService.findLatestPlantUpdate();

    return {
      plants,
      last_updated: latest ? latest.updatedAt.toISOString() : new Date().toISOString(),
      last_id: latest ? latest.lastId : (plants.length ? plants[plants.length - 1].id : 0),
      count: plants.length,
    };
  }
}
