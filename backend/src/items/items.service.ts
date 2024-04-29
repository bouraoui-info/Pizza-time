import { Injectable } from '@nestjs/common';
import { itemsEntity } from '../items/items.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../items/items.interface';

@Injectable()
export class ItemsService { 
    constructor(
    @InjectRepository(itemsEntity)
    private readonly itemsReposotory:Repository<itemsEntity>
){}

async createItem(item:Item): Promise<Item>{
    return this.itemsReposotory.save(item)
}
findAllItem():Promise<Item[]>{
    return this.itemsReposotory.find()
}
findOne(id:number):Promise<Item>{
    return this.itemsReposotory.findOne({where:{id}})
}
async updateItem(id:number,item:Item):Promise<Item>{
    await this.itemsReposotory.update(id,item)
    return this.itemsReposotory.findOne({where:{id}})
}

async deleteItem (id:number):Promise<void>{
    await this.itemsReposotory.delete(id)
}


}