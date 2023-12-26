import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Brand } from "../../database/entities/BrandEntity"
import { Request, Response } from "express"


export default new class AdminBrandService {
  private readonly brandRepository: Repository<Brand> = AppDataSource.getRepository(Brand)

  async createBrand(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body

      const isCheckNameBrand = this.brandRepository.findOne({
        where: { brand_name: body.brand_name }
      })
      if (isCheckNameBrand) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "BRAND ALREADY EXISTS"
          })
      }

      const brandData = this.brandRepository.create({
        brand_name: body.brand_name
      })
      const brandCreated = await this.brandRepository.save(brandData)
      return res
        .status(201)
        .json({
          code: 201,
          message: "BRAND CREATED",
          data: brandCreated
        })

    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          code: 500,
          message: "INTERNAL SERVER ERROR",
          error: error
        })
    }
  }
}