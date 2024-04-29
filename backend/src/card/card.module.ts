import { Module } from '@nestjs/common';
import { CardService } from '../card/card.service';
import { CardController } from '../card/card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cardEntity } from '../card/card.entity';

@Module({ imports:[
  TypeOrmModule.forFeature([cardEntity]),
],
  providers: [CardService],
  controllers: [CardController]
})
export class CardModule {}