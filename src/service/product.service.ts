import { ParsedQs } from "qs";
import { Brackets, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../database/AppDataSource";
import { apiWriteLog } from "../logger/writeLog";
import { Comment } from "../model/Comment";
import { ImageGallery } from "../model/ImageGallery";
import { MetaDeta } from "../model/MetaData";
import { Post } from "../model/Post";
import { Product } from "../model/Product";
import { ProductPrice } from "../model/ProductPrice";
import { Specification } from "../model/Specification";
import { TrackProductVisit } from "../model/TrackProductVisit";
import { User } from "../model/User";
import { esGetNumber, esIsEmpty } from "../utils/esHelper";
import { brandService } from "./brand.service";
import { categoryService } from "./category.service";

class ProductService {
  private productRepository: Repository<Product> | null = null;

  private initRepository(): void {
    if (this.productRepository === null) {
      this.productRepository = AppDataSource.getRepository(Product);
    }
  }

  async getAllProductBrand(query: any) {
    try {
      let skip = esGetNumber(query.start);
      let take = esGetNumber(query.end);
      let brand = query.brand;
      let odr = !esIsEmpty(query.odr) ? query.odr : "DESC";

      let products = null;
      if (take > 0) {
        products = await AppDataSource.createQueryBuilder(Product, "product")
          .where("product.brand = :brand", { brand })
          .leftJoinAndSelect("product.category", "category")
          .orderBy("product.createDate", odr)
          .skip(skip)
          .take(take)
          .getMany();
      } else {
        products = await AppDataSource.createQueryBuilder(Product, "product")
          .where("product.brand = :brand", { brand })
          .leftJoinAndSelect("product.category", "category")
          .orderBy("product.createDate", odr)
          .getMany();
      }

      return products;
    } catch (error) {
      apiWriteLog.error("Geting Search Products Error ", error);
      return null;
    }
  }

  async getProductSiteMapItems(query: any) {
    try {
      let skip = esGetNumber(query.start);
      let take = esGetNumber(query.end);
      let odr = !esIsEmpty(query.odr) ? query.odr : "DESC";

      const products = await AppDataSource.createQueryBuilder(
        Product,
        "product"
      )
        .select([
          "product.id",
          "product.aliasName",
          "product.title",
          "product.createDate",
          "product.updateDate",
        ])
        .leftJoinAndSelect("product.category", "category")
        .orderBy("product.createDate", odr)
        .skip(skip)
        .take(take)
        .getMany();

      return products;
    } catch (error) {
      apiWriteLog.error("Geting Search Products Error ", error);
      return null;
    }
  }

  async getProductSearchQuery(query: any) {
    try {
      query = `%${query}%`;

      const products = await AppDataSource.createQueryBuilder(
        Product,
        "product"
      )
        .where("product.title like :query", { query })
        .leftJoinAndSelect("product.prices", "prices")
        .leftJoinAndSelect("product.category", "category")
        .orderBy("product.createDate", "DESC")
        .getMany();

      return products;
    } catch (error) {
      apiWriteLog.error("Geting Search Products Error ", error);
      return null;
    }
  }

  async getProductSearchOptions() {
    try {
      const products = await AppDataSource.createQueryBuilder(
        Product,
        "product"
      )
        .select(["product.title", "product.aliasName"])
        .orderBy("product.createDate", "DESC")
        .getMany();

      return products;
    } catch (error) {
      apiWriteLog.error("Geting Search Products Error ", error);
      return null;
    }
  }

  async saveVisitCount(id: number, aliasName: string) {
    try {
      const prevVisit = await AppDataSource.getRepository(
        TrackProductVisit
      ).findOne({ where: { pId: id } });

      if (prevVisit) {
        let nVisits = prevVisit.visits + 1;
        AppDataSource.createQueryBuilder()
          .update(TrackProductVisit)
          .set({ visits: nVisits })
          .where("id= :id", { id: prevVisit.id })
          .execute();
      } else {
        const visit = new TrackProductVisit();
        visit.name = aliasName;
        visit.visits = 1;
        visit.pId = id;
        const query = AppDataSource.manager.create(TrackProductVisit, visit);
        AppDataSource.manager.save(query);
      }
    } catch (error) {
      apiWriteLog.error("Add Visit Count Error ", error);
    }
  }

  async getAllByPriceRange(query: any) {
    try {
      let minPrice = esGetNumber(query.start),
        maxPrice = esGetNumber(query.end);
      const products = await AppDataSource.createQueryBuilder(
        Product,
        "product"
      )
        .leftJoinAndSelect("product.prices", "prices")
        .leftJoinAndSelect("product.category", "category")
        .where("category.key = :cat", { cat: query.cat })
        .andWhere(
          new Brackets((qb) => {
            qb.where("product.price BETWEEN :minPrice AND :maxPrice", {
              minPrice,
              maxPrice,
            });
          })
        )
        .orderBy("product.createDate", "DESC")
        .take(500)
        .getMany();

      return products;
    } catch (error) {
      apiWriteLog.error("Product By Range Error ", error);
      return null;
    }
  }

  async getProductByPriceRange(cat: any, minPrice: number, maxPrice: number) {
    try {
      const products = await AppDataSource.createQueryBuilder(
        Product,
        "product"
      )
        .leftJoinAndSelect("product.prices", "prices")
        .leftJoinAndSelect("product.category", "category")
        .where("category.key = :cat", { cat })
        .andWhere(
          new Brackets((qb) => {
            qb.where("product.price BETWEEN :minPrice AND :maxPrice", {
              minPrice,
              maxPrice,
            });
          })
        )
        .orderBy("product.createDate", "DESC")
        .take(500)
        .getMany();

      return products;
    } catch (error) {
      apiWriteLog.error("Product By Range Error ", error);
      return null;
    }
  }

  async getMostVisitedProducts(limit: number) {
    try {
      const visitedItems = await AppDataSource.createQueryBuilder(
        TrackProductVisit,
        "productVisit"
      )
        .orderBy("productVisit.visits", "DESC")
        .limit(limit)
        .getMany();
      let ids: number[] = [];
      if (visitedItems) {
        visitedItems.forEach((item) => {
          ids.push(item.pId);
        });
      }
      const products = await AppDataSource.getRepository(Product).findByIds(
        ids
      );

      return products;
    } catch (error) {
      console.log("Getting Error MostVisitedProducts ", error);
    }
    return null;
  }

  async getNewArrivalProducts(cat: string) {
    try {
      const product = await AppDataSource.createQueryBuilder(Product, "product")
        .leftJoinAndSelect("product.category", "category")
        .where("category.key = :cat", { cat })
        .orderBy("product.createDate", "DESC")
        .limit(8)
        .getMany();

      return product;
    } catch (error) {
      console.log("Getting Error Services NewArrivalProducts ", error);
    }
    return null;
  }

  async getAliasName(query: any) {
    try {
      console.log("Get By AliasName Query ", query);

      const product = await AppDataSource.createQueryBuilder(Product, "product")
        .where({ aliasName: query })
        .leftJoinAndSelect("product.category", "category")
        .leftJoinAndSelect("product.images", "images")
        .leftJoinAndSelect("product.prices", "prices")
        .leftJoinAndSelect("product.specifications", "specifications")
        .leftJoinAndSelect("specifications.key", "key")
        .leftJoinAndSelect("product.metaDatas", "metaDatas")
        .leftJoinAndSelect("product.avgRating", "avgRating")
        .leftJoinAndSelect("avgRating.ratingItems", "ratingItems")
        .leftJoinAndSelect("ratingItems.rateKey", "rateKey")
        .getOne();

      return product;
    } catch (error) {
      console.log("Getting Error Services Alias Name ", error);
    }
    return null;
  }

  async getRecommendedProducts(product: Product) {
    try {
      let maxPrice = product.price + 5000,
        minPrice = product.price - 5000;
      minPrice = minPrice > 0 ? minPrice : 0;
      const products = await AppDataSource.createQueryBuilder(
        Product,
        "product"
      )

        .leftJoinAndSelect("product.category", "category")
        .where("category.key = :cat", { cat: product?.category?.key })
        .andWhere(
          new Brackets((qb) => {
            qb.where("product.price BETWEEN :minPrice AND :maxPrice", {
              minPrice,
              maxPrice,
            });
          })
        )
        .orderBy("product.createDate", "DESC")
        .limit(6)
        .getMany();
      return products;
    } catch (error) {
      console.log("Getting Recommended Error Products ", error);
    }
    return null;
  }

  async addComment(comment: Comment) {
    try {
      const initComment = AppDataSource.manager.create(Comment, comment);
      const dbComment = await AppDataSource.manager.save(initComment);
      return dbComment;
    } catch (error) {
      apiWriteLog.error("Add comment ProductServices Error ", error);
      return null;
    }
  }

  async getProductByAllyName(aliasName: string) {
    this.initRepository();
    const product = await this.productRepository?.findOne({
      where: { aliasName },
    });
    return product;
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
        const images: ImageGallery[] = [];

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

        nProduct.addAllMetaData(metaDataList);

        if (user !== null) {
          nProduct.user = user;
        }

        if (product.images) {
          product.images.forEach((image) => {
            if (image.id > 0) {
              nProduct.addImage(image);
            } else {
              const insImage = queryRunner.manager.create(ImageGallery, image);
              images.push(insImage);
            }
          });

          await queryRunner.manager.save(ImageGallery, images);
        }
        const insProduct = queryRunner.manager.create(Product, nProduct);
        saveProduct = await queryRunner.manager.save(insProduct);
        let pId = 0;
        if (saveProduct !== null && saveProduct !== undefined) {
          pId = saveProduct.id !== undefined ? Number(saveProduct.id) : 0;
        }
        let dbProdut: Product | null = null;

        if (product.images && pId > 0) {
          dbProdut = await queryRunner.manager.findOne(Product, {
            where: { id: pId },
          });
        }

        // Save specifications
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

  async getAll(query: any): Promise<any> {
    try {
      const { start, end, count, cat, page } = query;

      let offset = esGetNumber(start);
      let limit = esGetNumber(end);
      let products = null,
        productCount = 0;

      const categories = await categoryService.getAllCategoryAsStringArray();
      if (!esIsEmpty(cat)) {
        if (Array.isArray(categories)) {
          if (categories.includes(cat)) {
            if (limit > 0) {
              products = await AppDataSource.createQueryBuilder(
                Product,
                "product"
              )
                .leftJoinAndSelect("product.prices", "prices")
                .leftJoinAndSelect("product.category", "category")
                .where("category.key = :key", { key: cat })
                .orderBy("product.createDate", "DESC")
                .skip(offset)
                .take(limit)
                .getMany();
            } else {
              products = await AppDataSource.createQueryBuilder(
                Product,
                "product"
              )
                .leftJoinAndSelect("product.prices", "prices")
                .leftJoinAndSelect("product.category", "category")
                .where("category.key = :key", { key: cat })
                .orderBy("product.createDate", "DESC")
                .getMany();
            }
          }
        }
      } else {
        if (limit > 0) {
          products = await AppDataSource.createQueryBuilder(Product, "product")
            .leftJoinAndSelect("product.prices", "prices")
            .leftJoinAndSelect("product.category", "category")
            .orderBy("product.createDate", "DESC")
            .skip(offset)
            .take(limit)
            .getMany();
        } else {
          products = await AppDataSource.createQueryBuilder(Product, "product")
            .leftJoinAndSelect("product.category", "category")
            .orderBy("product.createDate", "DESC")
            .getMany();
        }
      }

      if (count === "yes") {
        if (!esIsEmpty(cat)) {
          productCount = await AppDataSource.createQueryBuilder(
            Product,
            "product"
          )
            .innerJoin("product.category", "category")
            .where("category.key = :cat", { cat })
            .getCount();
        } else {
          productCount = await AppDataSource.createQueryBuilder(
            Product,
            "product"
          ).getCount();
          console.log("productCount ", productCount);
        }
      }

      let phoneProducts = null,
        mixProducts = null,
        brands = null;
      if (page === "home") {
        phoneProducts = await this.getFeaturesProductsByCat("SmartPhone", 8);
        mixProducts = await this.getFeaturesProductsByCat(null, 8);
      }
      brands = await brandService.getAllBrand();

      return {
        products: products,
        count: productCount,
        fProduct: mixProducts,
        rSProduct: phoneProducts,
        brands,
      };
    } catch (err) {
      apiWriteLog.error(`Error All product `, err);
      return null;
    }
  }

  async getFeaturesProductsByCat(cat: any, take: number) {
    let products = null;

    try {
      if (!esIsEmpty(cat)) {
        products = await AppDataSource.createQueryBuilder(Product, "product")
          .leftJoinAndSelect("product.category", "category")
          .where("category.key = :cat", { cat })
          .orderBy("product.createDate", "DESC")
          .take(take)
          .getMany();
      } else {
        products = await AppDataSource.createQueryBuilder(Product, "product")
          .leftJoinAndSelect("product.category", "category")
          .orderBy("product.createDate", "DESC")
          .take(take)
          .getMany();
      }
    } catch (error) {
      apiWriteLog.error("getFeaturesProductsByCat Error ", error);
    }

    return products;
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
    nProduct.discountStatus = product.discountStatus
      ? product.discountStatus
      : false;
    nProduct.model = product.model ? product.model : "";

    nProduct.quantity = product.quantity ? Number(product.quantity) : 0;
    if (product.aliasName !== undefined && product.aliasName !== null) {
      nProduct.aliasName = product.aliasName;
    }

    return nProduct;
  }

  async saveViaJson(product: Product): Promise<Product | null | undefined> {
    let saveProduct: Product | undefined | null = null;
    if (product) {
      const nProduct: Product = this.mapProduct(product);
      const queryRunner = AppDataSource.createQueryRunner();
      queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        let specs: Specification[] = [];
        const metaDatas: MetaDeta[] = [];

        let user = await queryRunner.manager.findOne(User, {
          where: { id: 1 },
        });

        //Save New Metatdata

        if (product.metaDatas) {
          product.metaDatas.forEach((item, idx) => {
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

        nProduct.addAllMetaData(metaDataList);

        if (user !== null) {
          nProduct.user = user;
        }

        const images: ImageGallery[] = [];
        if (product.images) {
          product.images.forEach((image) => {
            if (image.id > 0) {
              nProduct.addImage(image);
            } else {
              const insImage = queryRunner.manager.create(ImageGallery, image);
              images.push(insImage);
            }
          });

          const dbImages = queryRunner.manager.save(images);
        }

        const insProduct = queryRunner.manager.create(Product, nProduct);
        saveProduct = await queryRunner.manager.save(insProduct);
        let pId = 0;
        if (saveProduct !== null && saveProduct !== undefined) {
          pId = saveProduct.id !== undefined ? Number(saveProduct.id) : 0;
        }
        let dbProdut: Product | null = null;

        //Save specifications
        const listSpecs: Specification[] = [];
        if (product.specifications) {
          product.specifications.forEach((spec: Specification) => {
            if (dbProdut !== undefined && dbProdut !== null) {
              spec.product = dbProdut;
              const querySpec = queryRunner.manager.create(Specification, spec);
              listSpecs.push(querySpec);
            }
          });

          const dbSpec = await queryRunner.manager.save(listSpecs);
        }

        //Save Product Prices
        const productPriceList: ProductPrice[] = [];
        if (product.prices) {
          product.prices.forEach((price: ProductPrice) => {
            if (dbProdut !== undefined && dbProdut !== null) {
              price.product = dbProdut;
              const queryProPrice = queryRunner.manager.create(
                ProductPrice,
                price
              );
              productPriceList.push(queryProPrice);
            }
          });

          const dbPrices = await queryRunner.manager.save(
            ProductPrice,
            productPriceList
          );
        }

        await queryRunner.commitTransaction();

        saveProduct.addAllImage(images);
        apiWriteLog.info("After Product Save ... ");
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
}

export const productService = new ProductService();
