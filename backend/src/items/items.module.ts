import { Module } from '@nestjs/common';
import { ItemsService } from '../items/items.service';
import { ItemsController } from '../items/items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { itemsEntity } from '../items/items.entity';

@Module({imports:[
  TypeOrmModule.forFeature([itemsEntity]),
],
  providers: [ItemsService],
  controllers: [ItemsController]
})
export class ItemsModule {}