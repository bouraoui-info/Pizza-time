import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ItemsService } from '../items/items.service';
import { BasicComposition, Item } from '../items/items.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Items')

@Controller('items')
export class ItemsController {
    constructor(
    private readonly itemsServices:ItemsService
){}
//create item
@Post('AddItems')
async AddItems(
    @Body('id')  id: number,
    @Body('title')  title: string,
    @Body('price')  price: number,
    @Body('ranks')  ranks: number,
    @Body('imageUrl')  imageUrl: string,
    @Body('basicComposition')  basicComposition: BasicComposition,
    @Body('categoryParent')  categoryParent: string,
    @Body('allergens') allergens: string[],
){ 
    try{
    const items = await this.itemsServices.createItem({id,title,price,ranks,imageUrl,basicComposition,categoryParent,allergens});
    return items;
    }catch(e){
        return{message:"items error:",e}
    }
    
}
//Get all items
@Get()
findAll():Promise<Item[]>{
    return(this.itemsServices.findAllItem())
}

//Get one item
@Get(':id')
findOne(@Param('id') id: number): Promise<Item> {
    const item = this.itemsServices.findOne(id);
    if (!item) {
        throw new Error('Item not found');
    } else {
        return item;
    }
}

//delete item
@Delete(':id')
async deleteItem(@Param('id') id: number): Promise<void> {
    await this.itemsServices.deleteItem(id);
}
//update item





}