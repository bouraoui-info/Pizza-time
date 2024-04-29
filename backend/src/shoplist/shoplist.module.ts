import { Module } from '@nestjs/common';
import { ShoplistService } from '../shoplist/shoplist.service';
import { ShoplistController } from '../shoplist/shoplist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { shoplistEntity } from '../shoplist/shoplist.entity';

@Module({imports:[
  TypeOrmModule.forFeature([shoplistEntity]),
],
  providers: [ShoplistService],
  controllers: [ShoplistController]
})
export class ShoplistModule {}