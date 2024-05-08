import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Product } from '../resto/product.entity';

@Injectable()
export class RestoService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,

  ) { }
  //add resto
  async ajouter(date: any): Promise<Product> {
    return this.productRepository.save(date);
  }
  async findOneResto(condition: any): Promise<Product> {
    return this.productRepository.findOne(condition);
  }
  //delete resto
  async deleteResto(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
  async findAllResto(): Promise<Product[]> {
    return await this.productRepository.find();
  }
  async update(id: number, Product: Product
  ): Promise<Product> {
    await this.productRepository.update(id, Product);
    return await this.productRepository.findOne({ where: { id } });
  }
  async findOneProduct(id: number): Promise<Product> {
    return await this.productRepository.findOne({ where: { id } });
  }

  async addProduct(productData: Partial<Product>): Promise<Product> {
    // Créez une nouvelle instance de Product avec les données fournies
    const newProduct = this.productRepository.create(productData);

    // Enregistrez le nouveau produit dans la base de données
    return await this.productRepository.save(newProduct);
  }
}
