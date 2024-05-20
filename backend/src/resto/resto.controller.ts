import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Delete,
  Res,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { RestoService } from './resto.service';
import { Product } from '../resto/product.entity';
import { ApiTags } from '@nestjs/swagger';
import { query } from 'express';
@ApiTags("restaurant")
@Controller('restaurant')
export class RestoController {
  productRepository: any;
  constructor(
    private readonly RestoService: RestoService,
  ) { }
  //ajouter resto 
  @Post('addresto')
  async addproduit(
    @Body('resto') resto: string,
    @Body('card') card: string,
  ) {
    return this.RestoService.ajouter({
      resto,
      card
    });
  }

  @Delete(':id')
  async deleteResto(@Param('id') id: number): Promise<void> {
    //handle the error if resto not found
    const resto: any = await this.RestoService.findOneResto({ where: { id } });
    if (!resto) {
      throw new Error('resto not found');
    }
    return this.RestoService.deleteResto(resto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    console.log(typeof (id));

    const user = await this.RestoService.findOneResto({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    } else {
      return user;
    }
  }
  //update user
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() product: Product,

  ): Promise<Product> {

    return this.RestoService.update(id, product);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.RestoService.findAllResto();
  }


  @Post('addCategorie')
  async addCategorie(
    @Query('idResto') id: number,
    @Body('card') card: any,
  ) {

    let resto: any = await this.RestoService.findOneResto({ where: { id } });

    resto.card.categories = { ...resto.card.categories, ...card }

    return this.RestoService.ajouter(resto);
  }
  @Get(':id/categories')
  async getCategoriesByRestaurant(@Param('id') id: number): Promise<any[]> {
    const resto: any = await this.RestoService.findOneResto({ where: { id } });
    if (!resto) {
      throw new Error('Restaurant not found');
    }
    return resto.card.categories;
  }
  @Get(':idResto/:idCat/product')
  async findOneProduct(@Param('idResto') idResto: number, @Param('idCat') idCat: string): Promise<Product> {
    const product: any = await this.RestoService.findOneProduct(idResto);
    let items = product.card.categories[idCat].items;
    let listproduct: any = [];
    items.forEach((el: any) => {
      let item = product.card.items[el]
      listproduct.push({ ...item, idProduct: el ,quantity:1})
    })
    if (!product) {
      throw new Error('Product not found');
    }
    return listproduct;
  }
  //ajouter Items
  @Post(':idResto/:idCat/addItem')
  async addItem(
    @Param('idCat') idCat: string,
    @Param('idResto') idResto: number,
    @Body('card') card: any,
  ): Promise<Product> {
    const product: any = await this.RestoService.findOneProduct(idResto);
    if (!product) {
      throw new Error('Product not found');
    }
    product.card.categories[idCat].items = [...product.card.categories[idCat].items, card.id];
    product.card.items = { ...product.card.items, [card.id]: { ...card } };
    return this.RestoService.saveItems(product);
  }
  //delete Items
  @Delete(':idResto/:idCat/:idItem')
  async deleteItem(

    @Param('idResto') idResto: number,
    @Param('idCat') idCat: string,
    @Param('idItem') idItem: string
    ): Promise<Product> {
      const product: any = await this.RestoService.findOneProduct(idResto);
      if (!product) {
        throw new Error('Product not found');
      }
      product.card.categories[idCat].items = product.card.categories[idCat].items.filter(
        (el: string) => el!== idItem
      );
      delete product.card.items[idItem];
      return this.RestoService.saveItems(product);
    }
  //delete Categorie
  @Delete(':idResto/:idCat')
  async deleteCategory(
    @Param('idResto') idResto: number,
    @Param('idCat') idCat: string
  ) {
    try {
      const resto: any = await this.RestoService.findOneResto({ where: { id: idResto } });

      if (!resto) {
        throw new Error('Restaurant not found');
      }

      if (!resto.card || !resto.card.categories) {
        throw new Error('Invalid restaurant data');
      }

      if (resto.card.categories[idCat]) {
        delete resto.card.categories[idCat];
        await this.RestoService.ajouter(resto);
        return `Category ${idCat} deleted successfully`;
      } else {
        throw new Error('Category not found');
      }
    } catch (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }









}
