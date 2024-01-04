import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Brand } from "../../../database/entities/BrandEntity"
import { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"


export default new class AdminBrandService {
  private readonly brandRepository: Repository<Brand> = AppDataSource.getRepository(Brand)

  async createBrand(req: Request, res: Response): Promise<Response> {
    try {
      const { brand_name } = req.body

      const brandNameFind = await this.brandRepository.findOne({
        where: {
          brand_name: brand_name
        }
      })

      if (brandNameFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "BRAND ALREADY EXISTS"
          })
      }

      const brandData = this.brandRepository.create({
        brand_name: brand_name
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


  async updateBrand(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const { brand_name } = req.body

      const brandIdFind = await this.brandRepository.findOne({
        where: {
          id: id
        }
      })
      const brandNameFind = await this.brandRepository.findOne({
        where: {
          brand_name: brand_name
        }
      })

      if (!brandIdFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "BRAND ID NOT FOUND"
          })
      }

      if (brandNameFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "BRAND NAME ALREADY EXISTS"
          })
      }

      if (brand_name) brandIdFind.brand_name = brand_name

      const brandUpdated = await this.brandRepository.save(brandIdFind)

      return res
        .status(200)
        .json({
          code: 200,
          message: "BRAND UPDATED",
          data: brandUpdated
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


  async deleteBrand(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const brandIdFind = await this.brandRepository.findOne({
        where: {
          id: id
        }
      })

      if (!brandIdFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "BRAND ID NOT FOUND"
          })
      }

      const brandDeleted = await this.brandRepository.remove(brandIdFind)

      return res
        .status(200)
        .json({
          code: 200,
          message: "BRAND DELETED",
          data: brandDeleted
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


  async getBrands(req: Request, res: Response): Promise<Response> {
    try {
      const brandsFind = await this.brandRepository.find({
        order: {
          id: "ASC"
        },
        relations: [
          "products"
        ],
        select: {
          // id: true,
          // brand_name: true,
          products: {
            // id: true,
            product_name: true
          }
        }
      })

      // brandsFind.forEach((brand) => {
      //   brand.products.sort((a, b) => a.id - b.id);
      // });

      // const sortedBrands = brandsFind.map((brand) => ({
      //   ...brand,
      //   products: brand.products.map(product => ({
      //     ...product,
      //     id: product.id || '' // Mengatasi nilai undefined dengan nilai default atau string kosong
      //   })).sort((a, b) => a.id.localeCompare(b.id)),
      // }));

      const sortedBrands = brandsFind.map((brand) => ({
        ...brand,
        products: brand.products.sort((a, b) => a.product_name.localeCompare(b.product_name)),
      }));


      return res
        .status(200)
        .json({
          code: 200,
          message: "BRAND SUCCESSFULLY",
          data: sortedBrands
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


  async getBrandById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const brandFind = await this.brandRepository.findOne({
        where: {
          id: id
        },
        relations: [
          "products"
        ],
        select: {
          // id: true,
          // brand_name: true,
          products: {
            product_name: true
          }
        }
      })

      // brands.forEach((brand) => {
      //   brand.products.sort((a, b) => a.id - b.id);
      // });

      const sortedBrand = {
        ...brandFind,
        products: brandFind.products.sort((a, b) => a.id.localeCompare(b.id)),
      };

      if (!brandFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "BRAND NOT FOUND"
          })
      }

      return res
        .status(200)
        .json({
          code: 200,
          message: "BRAND SUCCESSFULLY",
          data: sortedBrand
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