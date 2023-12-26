import { Repository } from "typeorm"
import { Product } from "../../database/entities/ProductEntity"
import { AppDataSource } from "../../data-source"


export default new class AdminProductService {
  private readonly productRepository: Repository<Product> = AppDataSource.getRepository(Product)

  async 
}