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
  async findOneProduct(@Param('idResto') idResto: number,@Param('idCat') idCat: string): Promise<Product> {    
    const product :any= await this.RestoService.findOneProduct(idResto);
    let items=product.card.categories[idCat].items;
    let listproduct:any=[];
    items.forEach((el:any)=>{
      let item=product.card.items[el]
      listproduct.push({...item,idProduct:el})
    })
    if (!product) {
      throw new Error('Product not found');
    }
    return listproduct;
  }



  @Post('addproduit')
  async addProduct(
    @Body() productData: any,
  ) {
    try {
      const { title, image, price } = productData;
      const newProduct = this.productRepository.create(productData);
      return await this.productRepository.save(newProduct);
    } catch (error) {
      console.log(error);
      throw new Error('Error saving product');
    }
  }}

