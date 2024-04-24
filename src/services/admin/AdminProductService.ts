import { Repository, Like } from "typeorm"
import { Product } from "../../../database/entities/ProductEntity"
import { AppDataSource } from "../../data-source"
import { Request, Response } from "express"
import { addProductSchema, updateProductSchema } from "../../utils/validator/ProductValidator"
import { Brand } from "../../../database/entities/BrandEntity"
import { Category } from "../../../database/entities/CategoryEntity"
import { deleteFromCloudinary, extractPublicIdFromImageUrl, uploadToCloudinary } from "../../utils/cloudinary/CloudinaryUploader"
import { deleteFile } from "../../utils/file/fileHelper"
import { v4 as uuidv4 } from "uuid"

export default new class AdminProductService {
  private readonly productRepository: Repository<Product> = AppDataSource.getRepository(Product)
  private readonly brandRepository: Repository<Brand> = AppDataSource.getRepository(Brand)
  private readonly categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const {
        product_name,
        product_quantity,
        product_price,
        product_description,
        product_image_1,
        product_image_2,
        product_image_3,
        brand_id,
        category_id
      } = req.body

      // let product_image = ["", "", ""]

      // if (req.files) {
      //   for (let i = 0; i < req.files.length; i++) {
      //     product_images[i] = await uploadToCloudinary(req.files[i])
      //     deleteFile(req.files[i].path)
      //   }
      // }

      const { error, value } = addProductSchema.validate(req.body)
      if (error) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "ADD PRODUCT FAILED, CHECK YOUR INPUT",
            error: error
          })
      }

      const brandIdFind = await this.brandRepository.findOne({
        where: {
          id: value.brand_id
        }
      })
      const categoryIdFind = await this.categoryRepository.findOne({
        where: {
          id: value.category_id
        }
      })
      const productNameFind = await this.productRepository.findOne({
        where: {
          product_name: value.product_name
        }
      })

      if (!brandIdFind || !categoryIdFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "BRAND OR CATEGORY NOT FOUND"
          })
      }
      if (productNameFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "PRODUCT ALREADY EXISTS"
          })
      }

      let cloudinary_product_image_1: string = ""
      if (req.file?.filename) {
        cloudinary_product_image_1 = await uploadToCloudinary(req.file)
        deleteFile(req.file?.path)
      }

      const productData = this.productRepository.create({
        product_name: value.product_name,
        product_quantity: value.product_quantity,
        product_price: value.product_price,
        product_description: value.product_description,
        product_image_1: cloudinary_product_image_1,
        product_image_2: value.product_image_2,
        product_image_3: value.product_image_3,
        brand: brandIdFind,
        category: categoryIdFind
      })

      const productCreated = await this.productRepository.save(productData)

      return res
        .status(201)
        .json({
          code: 201,
          message: "PRODUCT CREATED",
          data: productCreated
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


  async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const productFind = await this.productRepository.findOne({
        where: { id: id }
      })

      if (!productFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "PRODUCT NOT FOUND"
          })
      }

      const {
        product_name,
        product_quantity,
        product_price,
        product_description,
        product_image_1,
        product_image_2,
        product_image_3,
        brand_id,
        category_id
      } = req.body

      const { error, value } = updateProductSchema.validate(req.body)
      if (error) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "UPDATE PRODUCT FAILED, CHECK YOUR INPUT",
            error: error
          })
      }

      console.log(req.file);


      let cloudinary_product_image_1: string = ""
      if (req.file?.filename) {
        cloudinary_product_image_1 = await uploadToCloudinary(req.file)

        deleteFile(req.file?.path)
      }
      console.log(cloudinary_product_image_1);
      console.log(value.product_image_1);


      if (value.product_name) productFind.product_name = value.product_name
      if (value.product_quantity) productFind.product_quantity = value.product_quantity
      if (value.product_price) productFind.product_price = value.product_price
      if (value.product_description) productFind.product_description = value.product_description
      if (req.file) productFind.product_image_1 = cloudinary_product_image_1
      if (value.product_image_2) productFind.product_image_2 = value.product_image_2
      if (value.product_image_3) productFind.product_image_3 = value.product_image_3
      if (value.brand_id) productFind.brand = value.brand_id
      if (value.category_id) productFind.category = value.category_id

      const productUpdated = await this.productRepository.save(productFind)

      return res
        .status(200)
        .json({
          code: 200,
          message: "PRODUCT UPDATED",
          data: productUpdated
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


  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const productIdFind = await this.productRepository.findOne({
        where: { id: id }
      })

      if (!productIdFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "PRODUCT NOT FOUND"
          })
      }

      if (productIdFind.product_image_1) {
        // await deleteFromCloudinary(productIdFind.product_image_1)
        const publicId = extractPublicIdFromImageUrl(productIdFind.product_image_1)
        await deleteFromCloudinary(publicId)
        console.log("IMAGE DELETED FROM CLOUDINARY");

      }

      const productDeleted = await this.productRepository.remove(productIdFind)

      return res
        .status(200)
        .json({
          code: 200,
          message: "PRODUCT DELETED",
          data: productDeleted
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


  async getProducts(req: Request, res: Response): Promise<Response> {
    try {
      const productsFind = await this.productRepository.find({
        order: {
          product_name: "ASC"
        },
        relations: [
          "brand",
          "category",
        ],
        select: {
          brand: {
            id: true,
            brand_name: true
          },
          category: {
            id: true,
            category_name: true
          }
        }
      })


      if (!productsFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "PRODUCT NOT FOUND"
          })
      }

      return res
        .status(200)
        .json({
          code: 200,
          message: "PRODUCT SUCCESSFULLY",
          data: productsFind
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


  async getProductById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const productFind = await this.productRepository.findOne({
        where: { id: id },
        relations: [
          "brand",
          "category",
          // "transactions",
          // "admin",
        ],
        select: {
          brand: {
            id: true,
            brand_name: true
          },
          category: {
            id: true,
            category_name: true
          }
        },
      })

      if (!productFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "PRODUCT NOT FOUND"
          })
      }

      return res
        .status(200)
        .json({
          code: 200,
          message: "PRODUCT SUCCESSFULLY",
          data: productFind
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

  
  // async getProductsByCategory(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const { category_id } = req.params;

  //     const productsByCategory = await this.productRepository.find({
  //       where: { category: { id: category_id } },
  //       // relations: ["category"],
  //       // select: {
  //       //   category: {
  //       //     id: true,
  //       //     category_name: true
  //       //   }
  //       // }
  //     });

  //     if (!productsByCategory) {
  //       return res
  //         .status(404)
  //         .json({
  //           code: 404,
  //           message: "Products not found for the specified category"
  //         });
  //     }

  //     return res
  //       .status(200)
  //       .json({
  //         code: 200,
  //         message: "Products retrieved successfully by category",
  //         data: productsByCategory
  //       });

  //   } catch (error) {
  //     console.log(error);
  //     return res
  //       .status(500)
  //       .json({
  //         code: 500,
  //         message: "INTERNAL SERVER ERROR",
  //         error: error
  //       })
  //   }
  // }

  // async getProductsByCategory(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const { id } = req.params;
  //     console.log(id);


  //     const category = await this.categoryRepository.findOne({
  //       where: { id: id },
  //     });


  //     if (!category) {
  //       return res
  //         .status(404)
  //         .json({
  //           code: 404,
  //           message: "Products not found for the specified category"
  //         });
  //     }

  //     const productsByCategory = await this.productRepository.find({
  //       where: {
  //         category: { id: id }
  //       } // Menggunakan category sebagai kriteria pencarian
  //     });

  //     if (!productsByCategory || productsByCategory.length === 0) {
  //       return res.status(404).json({
  //         code: 404,
  //         message: "Products not found for the specified category"
  //       });
  //     }

  //     return res
  //       .status(200)
  //       .json({
  //         code: 200,
  //         message: "Products retrieved successfully by category",
  //         data: productsByCategory
  //       })

  //   } catch (error) {
  //     console.log(error);
  //     return res
  //       .status(500)
  //       .json({
  //         code: 500,
  //         message: "INTERNAL SERVER ERROR",
  //         error: error
  //       })
  //   }
  // }

  
  async getProductsByCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { category } = req.params;

      // const category = await this.categoryRepository.findOne({ where: { id: id } });

      // if (!category) {
      //   return res.status(404).json({ message: "Kategori tidak ditemukan" });
      // }

      const products = await this.productRepository.find({ where: { category: { category_name: category } },
      relations: ["brand"] });

      if (!products || products.length === 0) {
        return res
          .status(404)
          .json({
            message: "Produk tidak ditemukan"
          });
      }

      return res
        .status(200)
        .json({
          code: 200,
          message: "Produk ditemukan",
          data: products
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Kesalahan server" });
    }
  }
}