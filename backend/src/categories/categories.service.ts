import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { categoriesEntity } from '../categories/categories.entity';
import { categories } from '../categories/categories.interface';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(categoriesEntity)
        private readonly categoriesReposotory:Repository<categoriesEntity>
    ){}
    
    async createCategories(categories:categories): Promise<categories>{
        return this.categoriesReposotory.save(categories)
    }

    findAllcategories():Promise<categories[]>{
        return this.categoriesReposotory.find()
    }
}