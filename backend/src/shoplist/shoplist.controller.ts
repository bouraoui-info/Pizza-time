import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ShoplistService } from '../shoplist/shoplist.service';
import { horaire, shoplist, villelivraison } from '../shoplist/shoplist.interface';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Shoplist')
@Controller('shoplist')
export class ShoplistController {
    constructor(
        private shoplistServices: ShoplistService
    ) { }

    @Get()
    async findAll(): Promise<shoplist[]> {
        return await this.shoplistServices.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<shoplist> {
        const shoplist = await this.shoplistServices.findOne(id);
        if (!shoplist) {
            throw new Error('Shoplist not found');
        } else {
            return shoplist;
        }
    }

    @Post('Addshoplist')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                town: { type: 'string' },
                image: { type: 'string' },
                Nature: { type: 'string' },
                shopid: { type: 'number' },
                Address: { type: 'string' },
                Company: { type: 'string' },
                Country: { type: 'string' },
                PostalCode: { type: 'string' },
                latitude: { type: 'number' },
                longitude: { type: 'number' },
                tel: { type: 'string' },
                villelivraison: { type: 'villelivraison' },
                horaire: { type: 'horaire' }, // Ajoutez les deux-points ':' après horaire
                Responsible: { type: 'string' },
                etat: { type: 'string' },
            }
        }
    })
    async Addshoplist(
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
            etat,
        };
        return await this.shoplistServices.create(newShoplist);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() shoplist: shoplist
    ): Promise<shoplist> {
        return await this.shoplistServices.update(id, shoplist);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        const shoplist = await this.shoplistServices.findOne(id);
        if (!shoplist) {
            throw new Error('Shoplist not found');
        }
        return this.shoplistServices.delete(id);
    }
}
