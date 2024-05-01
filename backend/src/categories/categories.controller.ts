import { Body, Controller, Get, Post } from '@nestjs/common';
import { categories } from '../categories/categories.interface';
import { CategoriesService } from '../categories/categories.service';
import { ApiTags, ApiBody } from '@nestjs/swagger'; // Importez ApiBody

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesServices: CategoriesService) {}

    @Post('Addcategories')
    @ApiBody({ // Utilisez ApiBody pour définir le corps de la requête
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                items: { type: 'array', items: { type: 'string' } },
                ranks: { type: 'number' },
                title: { type: 'string' },
                idCard: { type: 'number' },
                imageUrl: { type: 'string' },
                categoryChild: { type: 'array', items: {} }, // Mettez le type correct ici
                categoryParent: { type: 'string' },
            },
        },
    })
    async AddCategories(
        @Body('id') id: number,
        @Body('items') items: string[],
        @Body('ranks') ranks: number,
        @Body('title') title: string,
        @Body('idCard') idCard: number,
        @Body('imageUrl') imageUrl: string,
        @Body('categoryChild') categoryChild: any[],
        @Body('categoryParent') categoryParent: string,
    ) {
        try {
            const categories = await this.categoriesServices.createCategories({
                id,
                items,
                ranks,
                title,
                idCard,
                imageUrl,
                categoryChild,
                categoryParent,
            });
            return categories;
        } catch (e) {
            return { message: "Categories error:", e };
        }
    }

    @Get()
    findAll(): Promise<categories[]> {
        return this.categoriesServices.findAllcategories();
    }
}
