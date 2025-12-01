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
  Patch,
  SetMetadata, // 👈 نضيف هذا
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { ItemsService } from './items.service';
import { User } from 'src/users/user.entity';
import { AuthRolesGuard } from '../guards/auth-roles.guard';
import { Roles } from '../users/decorators/user-role.decorator';

@Controller('api/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService,

  ) { }

  // @Roles(true)
  // @UseGuards(AuthRolesGuard)
  @UseInterceptors(FileInterceptor('img', { storage: multer.memoryStorage() }))
  @Post('upload')
  async uploadItem(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() req,
  ) {

    if (!file) throw new BadRequestException('الصورة مطلوبة');
    if (!body.type) throw new BadRequestException('type is required');

    const type = body.type.trim();
    console.log(body);


    const folderPath = `./public/assets/${type}`;
    if (!fs.existsSync(folderPath)) {
      throw new BadRequestException(`مجلد ${type} غير موجود`);
    }


    const fileExt = file.originalname.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${folderPath}/${fileName}`;


    fs.writeFileSync(filePath, file.buffer);

    const imageUrl = `http://localhost:5000/assets/${type}/${fileName}`;
    const admin: User = req.user;

    const data = { ...body, img: imageUrl };

    if (type === 'fertilizer') {
      return this.itemsService.addFertilizer(data, admin);
    }

    if (type === 'plant') {
      return this.itemsService.addPlant(data, admin);
    }

    throw new BadRequestException('نوع العنصر غير معروف');
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

  @UseGuards(AuthRolesGuard)
  @SetMetadata('isAdmin', true)
  @Patch('delete')
  async istDelete(
    @Body('ids') ids: number[],
    @Body('type') type: 'fertilizer' | 'plant'
  ) {
    if (ids) {
      return this.itemsService.Delete(ids, type);
    }
    return false;
  }

  @UseGuards(AuthRolesGuard)
  @SetMetadata('isAdmin', true)
  @Patch('unDelete')
  async unDelete(
    @Body('ids') ids: number[],
    @Body('type') type: 'fertilizer' | 'plant'
  ) {
    if (ids) {
      return this.itemsService.unDelete(ids, type);
    }
    return false;
  }

  @UseGuards(AuthRolesGuard)
  @SetMetadata('isAdmin', true)
  @Patch('save')
  async Save(
    @Body('ids') ids: number[],
    @Body('type') type: 'fertilizer' | 'plant'
  ) {
    if (ids && type) {
      return this.itemsService.Save(ids, type);
    }
    return false;
  }

  @UseGuards(AuthRolesGuard)
  @SetMetadata('isAdmin', true)
  @Patch('unsave')
  async unSave(
    @Body('ids') ids: number[],
    @Body('type') type: 'fertilizer' | 'plant'
  ) {
    if (ids && type) {
      return this.itemsService.unSave(ids, type);
    }
    return false;
  }



  @UseGuards(AuthRolesGuard)
  @SetMetadata('isAdmin', true)
  @Get('deletedFertilizers')
  async getFertilizersDelete(@Query('since') since?: string) {
    const lastUpdated = since ? new Date(since) : null;

    const fertilizers = lastUpdated
      ? await this.itemsService.findUpdatedAfterDelete(lastUpdated, 'fertilizers')
      : await this.itemsService.findAllDelete('fertilizers');

    const latest = await this.itemsService.findLatestUpdateTime('fertilizers');
    return {
      fertilizers,
      last_updated: latest,
    };
  }

  @UseGuards(AuthRolesGuard)
  @SetMetadata('isAdmin', true)
  @Get('deletedPlants')
  async getPlantsDelete(@Query('since') since?: string) {
    const lastUpdated = since ? new Date(since) : null;

    const fertilizers = lastUpdated
      ? await this.itemsService.findUpdatedAfterDelete(lastUpdated, 'plants')
      : await this.itemsService.findAllDelete('plants');

    const latest = await this.itemsService.findLatestUpdateTime('plants');
    return {
      fertilizers,
      last_updated: latest,
    };
  }
}

