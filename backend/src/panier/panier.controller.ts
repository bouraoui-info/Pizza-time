import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PanierService } from './panier.service';
import { CartItem } from './panier.interface';
import { User } from 'src/users/user.entity';
import { DeepPartial, UpdateResult } from 'typeorm';
import { Panier } from './panier.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('Panier')

@Controller('panier')
export class PanierController {
    constructor(private readonly panierService: PanierService) { }

    @Post('AddPanier')
    @ApiBody({ 
        schema: {
            type: 'object',
            properties: {
                cartItem: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            // Define properties of the CartItem type here
                        }
                    }
                },
                etat: { type: 'string' },
                prix: { type: 'number' },
                userId: { type: 'object' }, // Assuming User is an object type
                time: { type: 'string', format: 'date-time' }, // Assuming time is a date-time string
            },
        },
    })
    async AddPanier(
        @Body('cartItem') cartItem: CartItem[],
        @Body('etat') etat: string,
        @Body('prix') prix: string,
        @Body('userId') userId: string,
        @Body('time') time: string,
    ) {
        const partialPanier: DeepPartial<Panier> = {
            panier:cartItem,
            etat: etat,
            prix: prix,
            userId: userId,
            time: time,
        };
        return await this.panierService.createPanier(partialPanier);
    }

    @Get()
    async getPanier(
      
    ) {
        try {
            const panier = await this.panierService.findAllPanier({ where: {  etat: 'non payé' } });
            
            return panier;
        } catch (e) {
            return { message: 'Get panier error:', e };
        }
    }

    @Get('commande/:id')
    async getCommande(
        @Param('id') userId: string,
    ) {
        try {
             const commande:any = await this.panierService.findlistPanier();
             let panier=commande.filter((el:any)=>Number(el.userId)===Number(userId));
             
            if(panier!==undefined)
            return panier
        else return []
        } catch (e) {
            return { message: 'Get commande error:', e };
        }
    }

    @Delete(':id')
    async deletePanier(@Param('id') panier: Panier) {
        return this.panierService.deletePanier(panier);
    }

    @Put(':id')
    async updatePanier(@Param('id') panier: Panier): Promise<UpdateResult> {
        return this.panierService.updatePanier(panier);
    }
}

