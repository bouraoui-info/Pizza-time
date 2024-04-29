import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ShoplistService } from '../shoplist/shoplist.service';
import { horaire, shoplist, villelivraison } from '../shoplist/shoplist.interface';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('ShopList')


@Controller('shoplist')

export class ShoplistController {
    constructor(
        private shoplistServices: ShoplistService
    ) { }

    //Get all shopList
    @Get()
    async findAll(): Promise<shoplist[]> {
        return await this.shoplistServices.findAll();
    }
    //Get one shopList
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<shoplist> {
        const shoplist = await this.shoplistServices.findOne(id);
        if (!shoplist) {
            throw new Error('Shoplist not found');
        } else {
            return shoplist;
        }
    }
    //create shopList
    @Post('AddItems')

    async AddItems(
        @Body('id') id: number,
        @Body('town') town: string,
        @Body('image') image: string,
        @Body('Nature') Nature: string,
        @Body('shopid') shopid: number,
        @Body('Address') Address: string,
        @Body('Company') Company: string,
        @Body('Country') Country: string,
        @Body('PostalCode') PostalCode: string,
        @Body('latitude') latitude: number,
        @Body('longitude') longitude: number,
        @Body('tel') tel: string,
        @Body('villelivraison') villelivraison: villelivraison,
        @Body('horaire') horaire: horaire,
        @Body('Responsible') Responsible: string,
        @Body('etat') etat: string,
    ): Promise<shoplist> {
        const newShoplist = {
            id,
            town,
            image,
            Nature,
            shopid,
            Address,
            Company,
            Country,
            PostalCode,
            latitude,
            longitude,
            tel,
            villelivraison,
            horaire,
            Responsible,
            etat
        };
        return await this.shoplistServices.create(newShoplist);
    }

    //update shopList
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() shoplist: shoplist
    ): Promise<shoplist> {
        return await this.shoplistServices.update(id, shoplist);
    }

    //delete shopList
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.shoplistServices.delete(id);
    }
}