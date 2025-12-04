// SaveItem.dto.ts
import { IsEnum, IsNumber } from 'class-validator';
import { ItemType } from '../SaveItems.entity'; 
export class SaveItemDto {
  @IsNumber()
  itemId: number;

  @IsEnum(ItemType)
  itemType: ItemType;
}
