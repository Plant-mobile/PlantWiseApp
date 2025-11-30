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
  Query,
  Patch, // 👈 نضيف هذا
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { ItemsService } from './items.service';
import { User } from 'src/users/user.entity';
import { AuthRolesGuard } from '../guards/auth-roles.guard';
import { Roles } from '../users/decorators/user-role.decorator';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService,
   
  ) { }

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
    
@UseGuards(AuthRolesGuard) 
  @Get('plants')
  async getPlants(@Query('since') since?: string) {
    const lastUpdated = since ? new Date(since) : null;

    const plants = lastUpdated
      ? await this.itemsService.findUpdatedAfter(lastUpdated, 'plants')
      : await this.itemsService.findAllPlants();

    const latest = await this.itemsService.findLatestUpdateTime('plants');
    return {
      plants,
      last_updated: latest,
    };
  }

  @UseGuards(AuthRolesGuard) 
  @Get('fertilizers')
  async getFertilizers(@Query('since') since?: string) {
    const lastUpdated = since ? new Date(since) : null;


    const fertilizers = lastUpdated
      ? await this.itemsService.findUpdatedAfter(lastUpdated, 'fertilizers')
      : await this.itemsService.findAllFertilizers();

    const latest = await this.itemsService.findLatestUpdateTime('fertilizers');
    return {
      fertilizers,
      last_updated: latest,
    };
  }
   @Patch('is-delete')
  async istDelete(
    @Body('ids') ids: number[]   // تستقبل array من id
  ) {
    return this.itemsService.isDelete(ids);
  }
   @Patch('un-delete')
  async unDelete(
    @Body('ids') ids: number[]   // تستقبل array من id
  ) {
    return this.itemsService.unDelete(ids);
  }


  
  @UseGuards(AuthRolesGuard) 
  @Get('fertilizers')
  async getFertilizersIsDelete(@Query('since') since?: string) {
    const lastUpdated = since ? new Date(since) : null;


    const fertilizers = lastUpdated
      ? await this.itemsService.findUpdatedFertilizersAfterIsDelete(lastUpdated)
      : await this.itemsService.findAllFertilizersIsDelete();

    const latest = await this.itemsService.findLatestUpdateTime('fertilizers');
    return {
      fertilizers,
      last_updated: latest,
    };
  }
}

