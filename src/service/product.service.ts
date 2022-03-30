import { EntityManager, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../database/AppDataSource";
import { apiWriteLog } from "../logger/writeLog";
import { ImageGallery } from "../model/ImageGallery";
import { MetaDeta } from "../model/MetaData";
import { Post } from "../model/Post";
import { Product } from "../model/Product";
import { Specification } from "../model/Specification";
import { Tag } from "../model/Tag";
import { User } from "../model/User";
import { esIsEmpty } from "../utils/esHelper";

class ProductService {
  private productRepository: Repository<Product> | null = null;

  private initRepository(): void {
    if (this.productRepository === null) {
      this.productRepository = AppDataSource.getRepository(Product);
    }
  }

  async save(product: Partial<Product>) {
    let saveProduct: Product | undefined | null = null;
    if (product) {
      const nProduct: Product = this.mapProduct(product);
      const queryRunner = AppDataSource.createQueryRunner();
      queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        let specs: Specification[] = [];
        const metaDatas: MetaDeta[] = [];
        const tags: Tag[] = [];

        let user = await queryRunner.manager.findOne(User, {
          where: { id: 1 },
        });

        //Save New Metatdata

        if (product.metaDatas) {
          product.metaDatas.forEach(async (item, idx) => {
            if (item.id > 0) {
              nProduct.addMetaData(item);
            } else {
              const insMetaData = queryRunner.manager.create(MetaDeta, item);
              metaDatas.push(insMetaData);
            }
          });
        }

        const metaDataList = await queryRunner.manager.save(
          MetaDeta,
          metaDatas
        );
        console.log(
          "After Save Metadat Array ",
          JSON.stringify(metaDataList, null, 2)
        );
        //Save new Tags
        if (product.tags) {
          product.tags.forEach(async (item, idx) => {
            if (item.id > 0) {
              nProduct.addTag(item);
              item.products = [nProduct];
            } else {
              const insTag = queryRunner.manager.create(Tag, item);
              tags.push(insTag);
            }
          });
        }

        const dbTags = await queryRunner.manager.save(Tag, tags);
        console.log(
          "Current Tags After Save ",
          JSON.stringify(dbTags, null, 2)
        );

        nProduct.addAllTag(dbTags);
        nProduct.addAllMetaData(metaDataList);

        if (user !== null) {
          nProduct.user = user;
        }

        console.log("CUrrent Product ", JSON.stringify(nProduct, null, 2));

        const insProduct = queryRunner.manager.create(Product, nProduct);
        saveProduct = await queryRunner.manager.save(insProduct);
        let pId = 0;
        if (saveProduct !== null && saveProduct !== undefined) {
          pId = saveProduct.id !== undefined ? Number(saveProduct.id) : 0;
        }
        let dbProdut: Product | null = null;
        const images: ImageGallery[] = [];
        if (product.images && pId > 0) {
          dbProdut = await queryRunner.manager.findOne(Product, {
            where: { id: pId },
          });
          product.images.forEach(async (image) => {
            if (dbProdut !== null) {
              image.product = dbProdut;

              const insImage = queryRunner.manager.create(ImageGallery, image);
              const dbImage = await queryRunner.manager.save(insImage);
              images.push(dbImage);
            }
          });
        }

        //Save specifications
        if (product.specifications) {
          product.specifications.forEach(async (spec) => {
            if (dbProdut !== undefined && dbProdut !== null) {
              spec.product = dbProdut;
              const insSpec = queryRunner.manager.create(Specification, spec);
              const dbSpec = await queryRunner.manager.save(insSpec);
              if (dbSpec !== undefined && dbSpec !== null) {
                specs.push(dbSpec);
              }
            }
          });
        }

        await queryRunner.commitTransaction();
        saveProduct.addAllImage(images);
      } catch (error) {
        apiWriteLog.error("Product Save Error ", error);
        await queryRunner.rollbackTransaction();
      } finally {
        console.log("Query Runner ", queryRunner.isReleased);
        if (queryRunner.isReleased) {
          await queryRunner.release();
        }
      }
    }
    return saveProduct;
  }

  async getById(id: number): Promise<Product | null | undefined> {
    this.initRepository();
    try {
      const product = await this.productRepository?.findOne({
        where: { id: id },
      });
      return product;
    } catch (err) {
      apiWriteLog.error("Error getproductByID ", err);
      return null;
    }
  }

  async getAll(): Promise<Product[] | null | undefined> {
    this.initRepository();
    try {
      const product = await this.productRepository?.find();
      return product;
    } catch (err) {
      apiWriteLog.error(`Error All product `, err);
      return null;
    }
  }

  async update(
    product: Partial<Product>
  ): Promise<UpdateResult | null | undefined> {
    this.initRepository();
    if (!esIsEmpty(product)) {
      try {
        const updateproduct = await this.productRepository?.update(
          { id: product.id },
          product
        );

        return updateproduct;
      } catch (error) {
        apiWriteLog.error(`Update product Error, `, error);
        return null;
      }
    }

    return null;
  }
  async delete(id: number) {
    this.initRepository();
    try {
      const products = await this.productRepository?.delete({ id: id });
      return products;
    } catch (err) {
      apiWriteLog.error("Error All product ", err);
      return null;
    }
  }

  private mapProduct(product: Partial<Product>): Product {
    const nProduct = new Product();

    if (product.brand !== undefined && product.brand !== null) {
      nProduct.brand = product.brand;
    }

    if (product.category !== null && product.category !== undefined) {
      nProduct.category = product.category;
    }

    nProduct.title = product.title ? product.title : "";
    nProduct.description = product.description ? product.description : "";
    nProduct.discountPrice = product.discountPrice
      ? Number(product.discountPrice)
      : 0;
    nProduct.discountStatus = product.discountStatus
      ? product.discountStatus
      : false;
    nProduct.model = product.model ? product.model : "";
    nProduct.price = product.price ? Number(product.price) : 0;
    nProduct.quantity = product.quantity ? Number(product.quantity) : 0;

    return nProduct;
  }
}

export const productService = new ProductService();
