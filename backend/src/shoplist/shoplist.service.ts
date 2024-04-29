import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { shoplistEntity } from '../shoplist/shoplist.entity';
import { Repository } from 'typeorm';
import { shoplist } from '../shoplist/shoplist.interface';

@Injectable()
export class ShoplistService {
    constructor(
        @InjectRepository(shoplistEntity)
        private readonly shoplistReposotory: Repository<shoplistEntity>
    ) { }

    async createShop(shoplist: shoplist): Promise<shoplist> {
        return this.shoplistReposotory.save(shoplist)
    }
    findAll(): Promise<shoplist[]> {
        return this.shoplistReposotory.find()
    }
    // get one Shoplist
    async findOne(id: number): Promise<shoplist> {
        return await this.shoplistReposotory.findOne({ where: { id } });
    }
    //create Shoplist
    async create(shoplist: shoplist): Promise<shoplist> {
        const newShoplist = this.shoplistReposotory.create(shoplist);
        return await this.shoplistReposotory.save(newShoplist);
    }
    // update Shoplist
    async update(id: number, shoplist: shoplist): Promise<shoplist> {
        await this.shoplistReposotory.update(id, shoplist);
        return await this.shoplistReposotory.findOne({ where: { id } });
    }

    //delete Shoplist
    async delete(id: number): Promise<void> {
        await this.shoplistReposotory.delete(id);
    }


}