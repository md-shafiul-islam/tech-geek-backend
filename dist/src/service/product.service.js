"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const typeorm_1 = require("typeorm");
const AppDataSource_1 = require("../database/AppDataSource");
const writeLog_1 = require("../logger/writeLog");
const Comment_1 = require("../model/Comment");
const ImageGallery_1 = require("../model/ImageGallery");
const MetaData_1 = require("../model/MetaData");
const Product_1 = require("../model/Product");
const ProductPrice_1 = require("../model/ProductPrice");
const Specification_1 = require("../model/Specification");
const TrackProductVisit_1 = require("../model/TrackProductVisit");
const User_1 = require("../model/User");
const esHelper_1 = require("../utils/esHelper");
const brand_service_1 = require("./brand.service");
const category_service_1 = require("./category.service");
class ProductService {
    productRepository = null;
    initRepository() {
        if (this.productRepository === null) {
            this.productRepository = AppDataSource_1.AppDataSource.getRepository(Product_1.Product);
        }
    }
    async getCount() {
        this.initRepository();
        try {
            const count = await this.productRepository?.count();
            return count;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error Product Count Error ", err);
            return 0;
        }
    }
    async getAllProductBrand(query) {
        try {
            let skip = (0, esHelper_1.esGetNumber)(query.start);
            let take = (0, esHelper_1.esGetNumber)(query.end);
            let brand = query.brand;
            let odr = !(0, esHelper_1.esIsEmpty)(query.odr) ? query.odr : "DESC";
            let products = null;
            if (take > 0) {
                products = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
                    .where("product.brand = :brand", { brand })
                    .leftJoinAndSelect("product.category", "category")
                    .orderBy("product.createDate", odr)
                    .skip(skip)
                    .take(take)
                    .getMany();
            }
            else {
                products = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
                    .where("product.brand = :brand", { brand })
                    .leftJoinAndSelect("product.category", "category")
                    .orderBy("product.createDate", odr)
                    .getMany();
            }
            return products;
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Geting Search Products Error ", error);
            return null;
        }
    }
    async getProductSiteMapItems(query) {
        try {
            let skip = (0, esHelper_1.esGetNumber)(query.start);
            let take = (0, esHelper_1.esGetNumber)(query.end);
            let odr = !(0, esHelper_1.esIsEmpty)(query.odr) ? query.odr : "DESC";
            const products = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
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
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Geting Search Products Error ", error);
            return null;
        }
    }
    async getProductSearchQuery(query) {
        try {
            query = `%${query}%`;
            const products = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
                .where("product.title like :query", { query })
                .leftJoinAndSelect("product.prices", "prices")
                .leftJoinAndSelect("product.category", "category")
                .orderBy("product.createDate", "DESC")
                .getMany();
            return products;
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Geting Search Products Error ", error);
            return null;
        }
    }
    async getProductSearchOptions() {
        try {
            const products = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
                .select(["product.title", "product.aliasName"])
                .orderBy("product.createDate", "DESC")
                .getMany();
            return products;
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Geting Search Products Error ", error);
            return null;
        }
    }
    async saveVisitCount(id, aliasName) {
        try {
            const prevVisit = await AppDataSource_1.AppDataSource.getRepository(TrackProductVisit_1.TrackProductVisit).findOne({ where: { pId: id } });
            if (prevVisit) {
                let nVisits = prevVisit.visits + 1;
                AppDataSource_1.AppDataSource.createQueryBuilder()
                    .update(TrackProductVisit_1.TrackProductVisit)
                    .set({ visits: nVisits })
                    .where("id= :id", { id: prevVisit.id })
                    .execute();
            }
            else {
                const visit = new TrackProductVisit_1.TrackProductVisit();
                visit.name = aliasName;
                visit.visits = 1;
                visit.pId = id;
                const query = AppDataSource_1.AppDataSource.manager.create(TrackProductVisit_1.TrackProductVisit, visit);
                AppDataSource_1.AppDataSource.manager.save(query);
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Add Visit Count Error ", error);
        }
    }
    async getAllByPriceRange(query) {
        try {
            let minPrice = (0, esHelper_1.esGetNumber)(query.start), maxPrice = (0, esHelper_1.esGetNumber)(query.end);
            const products = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
                .leftJoinAndSelect("product.prices", "prices")
                .leftJoinAndSelect("product.category", "category")
                .where("category.key = :cat", { cat: query.cat })
                .andWhere(new typeorm_1.Brackets((qb) => {
                qb.where("product.price BETWEEN :minPrice AND :maxPrice", {
                    minPrice,
                    maxPrice,
                });
            }))
                .orderBy("product.createDate", "DESC")
                .take(500)
                .getMany();
            return products;
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Product By Range Error ", error);
            return null;
        }
    }
    async getProductByPriceRange(cat, minPrice, maxPrice) {
        try {
            const products = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
                .leftJoinAndSelect("product.prices", "prices")
                .leftJoinAndSelect("product.category", "category")
                .where("category.key = :cat", { cat })
                .andWhere(new typeorm_1.Brackets((qb) => {
                qb.where("product.price BETWEEN :minPrice AND :maxPrice", {
                    minPrice,
                    maxPrice,
                });
            }))
                .orderBy("product.createDate", "DESC")
                .take(500)
                .getMany();
            return products;
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Product By Range Error ", error);
            return null;
        }
    }
    async getMostVisitedProducts(limit) {
        try {
            const visitedItems = await AppDataSource_1.AppDataSource.createQueryBuilder(TrackProductVisit_1.TrackProductVisit, "productVisit")
                .orderBy("productVisit.visits", "DESC")
                .limit(limit)
                .getMany();
            let ids = [];
            if (visitedItems) {
                visitedItems.forEach((item) => {
                    ids.push(item.pId);
                });
            }
            const products = await AppDataSource_1.AppDataSource.getRepository(Product_1.Product).findByIds(ids);
            return products;
        }
        catch (error) {
            console.log("Getting Error MostVisitedProducts ", error);
        }
        return null;
    }
    async getNewArrivalProducts(cat) {
        try {
            const product = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
                .leftJoinAndSelect("product.category", "category")
                .where("category.key = :cat", { cat })
                .orderBy("product.createDate", "DESC")
                .limit(8)
                .getMany();
            return product;
        }
        catch (error) {
            console.log("Getting Error Services NewArrivalProducts ", error);
        }
        return null;
    }
    async getAliasName(query) {
        try {
            console.log("Get By AliasName Query ", query);
            const product = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
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
        }
        catch (error) {
            console.log("Getting Error Services Alias Name ", error);
        }
        return null;
    }
    async getRecommendedProducts(product) {
        try {
            let maxPrice = product.price + 5000, minPrice = product.price - 5000;
            minPrice = minPrice > 0 ? minPrice : 0;
            const products = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
                .leftJoinAndSelect("product.category", "category")
                .where("category.key = :cat", { cat: product?.category?.key })
                .andWhere(new typeorm_1.Brackets((qb) => {
                qb.where("product.price BETWEEN :minPrice AND :maxPrice", {
                    minPrice,
                    maxPrice,
                });
            }))
                .orderBy("product.createDate", "DESC")
                .limit(6)
                .getMany();
            return products;
        }
        catch (error) {
            console.log("Getting Recommended Error Products ", error);
        }
        return null;
    }
    async addComment(comment) {
        try {
            const initComment = AppDataSource_1.AppDataSource.manager.create(Comment_1.Comment, comment);
            const dbComment = await AppDataSource_1.AppDataSource.manager.save(initComment);
            return dbComment;
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Add comment ProductServices Error ", error);
            return null;
        }
    }
    async getProductByAllyName(aliasName) {
        this.initRepository();
        const product = await this.productRepository?.findOne({
            where: { aliasName },
        });
        return product;
    }
    async save(product) {
        let saveProduct = null;
        if (product) {
            const nProduct = this.mapProduct(product);
            const queryRunner = AppDataSource_1.AppDataSource.createQueryRunner();
            queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                let specs = [];
                const metaDatas = [];
                const images = [];
                let user = await queryRunner.manager.findOne(User_1.User, {
                    where: { id: 1 },
                });
                //Save New Metatdata
                if (product.metaDatas) {
                    product.metaDatas.forEach(async (item, idx) => {
                        if (item.id > 0) {
                            nProduct.addMetaData(item);
                        }
                        else {
                            const insMetaData = queryRunner.manager.create(MetaData_1.MetaDeta, item);
                            metaDatas.push(insMetaData);
                        }
                    });
                }
                const metaDataList = await queryRunner.manager.save(MetaData_1.MetaDeta, metaDatas);
                nProduct.addAllMetaData(metaDataList);
                if (user !== null) {
                    nProduct.user = user;
                }
                if (product.images) {
                    product.images.forEach((image) => {
                        if (image.id > 0) {
                            nProduct.addImage(image);
                        }
                        else {
                            const insImage = queryRunner.manager.create(ImageGallery_1.ImageGallery, image);
                            images.push(insImage);
                        }
                    });
                    await queryRunner.manager.save(ImageGallery_1.ImageGallery, images);
                }
                const insProduct = queryRunner.manager.create(Product_1.Product, nProduct);
                saveProduct = await queryRunner.manager.save(insProduct);
                let pId = 0;
                if (saveProduct !== null && saveProduct !== undefined) {
                    pId = saveProduct.id !== undefined ? Number(saveProduct.id) : 0;
                }
                let dbProdut = null;
                if (product.images && pId > 0) {
                    dbProdut = await queryRunner.manager.findOne(Product_1.Product, {
                        where: { id: pId },
                    });
                }
                // Save specifications
                if (product.specifications) {
                    product.specifications.forEach(async (spec) => {
                        if (dbProdut !== undefined && dbProdut !== null) {
                            spec.product = dbProdut;
                            const insSpec = queryRunner.manager.create(Specification_1.Specification, spec);
                            const dbSpec = await queryRunner.manager.save(insSpec);
                            if (dbSpec !== undefined && dbSpec !== null) {
                                specs.push(dbSpec);
                            }
                        }
                    });
                }
                await queryRunner.commitTransaction();
                saveProduct.addAllImage(images);
            }
            catch (error) {
                writeLog_1.apiWriteLog.error("Product Save Error ", error);
                await queryRunner.rollbackTransaction();
            }
            finally {
                console.log("Query Runner ", queryRunner.isReleased);
                if (queryRunner.isReleased) {
                    await queryRunner.release();
                }
            }
        }
        return saveProduct;
    }
    async getById(id) {
        this.initRepository();
        try {
            const product = await this.productRepository?.findOne({
                where: { id: id },
            });
            return product;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error getproductByID ", err);
            return null;
        }
    }
    async getAll(query) {
        try {
            const { start, end, count, cat, page } = query;
            let offset = (0, esHelper_1.esGetNumber)(start);
            let limit = (0, esHelper_1.esGetNumber)(end);
            let products = null, productCount = 0;
            const categories = await category_service_1.categoryService.getAllCategoryAsStringArray();
            if (!(0, esHelper_1.esIsEmpty)(cat)) {
                if (Array.isArray(categories)) {
                    if (categories.includes(cat)) {
                        if (limit > 0) {
                            products = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
                                .leftJoinAndSelect("product.prices", "prices")
                                .leftJoinAndSelect("product.category", "category")
                                .where("category.key = :key", { key: cat })
                                .orderBy("product.createDate", "DESC")
                                .skip(offset)
                                .take(limit)
                                .getMany();
                        }
                        else {
                            products = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
                                .leftJoinAndSelect("product.prices", "prices")
                                .leftJoinAndSelect("product.category", "category")
                                .where("category.key = :key", { key: cat })
                                .orderBy("product.createDate", "DESC")
                                .getMany();
                        }
                    }
                }
            }
            else {
                if (limit > 0) {
                    products = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
                        .leftJoinAndSelect("product.prices", "prices")
                        .leftJoinAndSelect("product.category", "category")
                        .orderBy("product.createDate", "DESC")
                        .skip(offset)
                        .take(limit)
                        .getMany();
                }
                else {
                    products = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
                        .leftJoinAndSelect("product.category", "category")
                        .orderBy("product.createDate", "DESC")
                        .getMany();
                }
            }
            if (count === "yes") {
                if (!(0, esHelper_1.esIsEmpty)(cat)) {
                    productCount = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
                        .innerJoin("product.category", "category")
                        .where("category.key = :cat", { cat })
                        .getCount();
                }
                else {
                    productCount = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product").getCount();
                    console.log("productCount ", productCount);
                }
            }
            let phoneProducts = null, mixProducts = null, brands = null;
            if (page === "home") {
                phoneProducts = await this.getFeaturesProductsByCat("SmartPhone", 8);
                mixProducts = await this.getFeaturesProductsByCat(null, 8);
            }
            brands = await brand_service_1.brandService.getAllBrand();
            return {
                products: products,
                count: productCount,
                fProduct: mixProducts,
                rSProduct: phoneProducts,
                brands,
            };
        }
        catch (err) {
            writeLog_1.apiWriteLog.error(`Error All product `, err);
            return null;
        }
    }
    async getFeaturesProductsByCat(cat, take) {
        let products = null;
        try {
            if (!(0, esHelper_1.esIsEmpty)(cat)) {
                products = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
                    .leftJoinAndSelect("product.category", "category")
                    .where("category.key = :cat", { cat })
                    .orderBy("product.createDate", "DESC")
                    .take(take)
                    .getMany();
            }
            else {
                products = await AppDataSource_1.AppDataSource.createQueryBuilder(Product_1.Product, "product")
                    .leftJoinAndSelect("product.category", "category")
                    .orderBy("product.createDate", "DESC")
                    .take(take)
                    .getMany();
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("getFeaturesProductsByCat Error ", error);
        }
        return products;
    }
    async update(product) {
        this.initRepository();
        if (!(0, esHelper_1.esIsEmpty)(product)) {
            try {
                const updateproduct = await this.productRepository?.update({ id: product.id }, product);
                return updateproduct;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error(`Update product Error, `, error);
                return null;
            }
        }
        return null;
    }
    async delete(id) {
        this.initRepository();
        try {
            const products = await this.productRepository?.delete({ id: id });
            return products;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error All product ", err);
            return null;
        }
    }
    mapProduct(product) {
        const nProduct = new Product_1.Product();
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
    async saveViaJson(product) {
        let saveProduct = null;
        if (product) {
            const nProduct = this.mapProduct(product);
            const queryRunner = AppDataSource_1.AppDataSource.createQueryRunner();
            queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                let specs = [];
                const metaDatas = [];
                let user = await queryRunner.manager.findOne(User_1.User, {
                    where: { id: 1 },
                });
                //Save New Metatdata
                if (product.metaDatas) {
                    product.metaDatas.forEach((item, idx) => {
                        if (item.id > 0) {
                            nProduct.addMetaData(item);
                        }
                        else {
                            const insMetaData = queryRunner.manager.create(MetaData_1.MetaDeta, item);
                            metaDatas.push(insMetaData);
                        }
                    });
                }
                const metaDataList = await queryRunner.manager.save(MetaData_1.MetaDeta, metaDatas);
                nProduct.addAllMetaData(metaDataList);
                if (user !== null) {
                    nProduct.user = user;
                }
                const images = [];
                if (product.images) {
                    product.images.forEach((image) => {
                        if (image.id > 0) {
                            nProduct.addImage(image);
                        }
                        else {
                            const insImage = queryRunner.manager.create(ImageGallery_1.ImageGallery, image);
                            images.push(insImage);
                        }
                    });
                    const dbImages = queryRunner.manager.save(images);
                }
                const insProduct = queryRunner.manager.create(Product_1.Product, nProduct);
                saveProduct = await queryRunner.manager.save(insProduct);
                let pId = 0;
                if (saveProduct !== null && saveProduct !== undefined) {
                    pId = saveProduct.id !== undefined ? Number(saveProduct.id) : 0;
                }
                let dbProdut = null;
                //Save specifications
                const listSpecs = [];
                if (product.specifications) {
                    product.specifications.forEach((spec) => {
                        if (dbProdut !== undefined && dbProdut !== null) {
                            spec.product = dbProdut;
                            const querySpec = queryRunner.manager.create(Specification_1.Specification, spec);
                            listSpecs.push(querySpec);
                        }
                    });
                    const dbSpec = await queryRunner.manager.save(listSpecs);
                }
                //Save Product Prices
                const productPriceList = [];
                if (product.prices) {
                    product.prices.forEach((price) => {
                        if (dbProdut !== undefined && dbProdut !== null) {
                            price.product = dbProdut;
                            const queryProPrice = queryRunner.manager.create(ProductPrice_1.ProductPrice, price);
                            productPriceList.push(queryProPrice);
                        }
                    });
                    const dbPrices = await queryRunner.manager.save(ProductPrice_1.ProductPrice, productPriceList);
                }
                await queryRunner.commitTransaction();
                saveProduct.addAllImage(images);
                writeLog_1.apiWriteLog.info("After Product Save ... ");
            }
            catch (error) {
                writeLog_1.apiWriteLog.error("Product Save Error ", error);
                await queryRunner.rollbackTransaction();
            }
            finally {
                console.log("Query Runner ", queryRunner.isReleased);
                if (queryRunner.isReleased) {
                    await queryRunner.release();
                }
            }
        }
        return saveProduct;
    }
}
exports.productService = new ProductService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJvZHVjdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFDQUE2RDtBQUM3RCw2REFBMEQ7QUFDMUQsaURBQWlEO0FBQ2pELDhDQUEyQztBQUMzQyx3REFBcUQ7QUFDckQsZ0RBQTZDO0FBRTdDLDhDQUEyQztBQUMzQyx3REFBcUQ7QUFDckQsMERBQXVEO0FBQ3ZELGtFQUErRDtBQUMvRCx3Q0FBcUM7QUFDckMsZ0RBQTJEO0FBQzNELG1EQUErQztBQUMvQyx5REFBcUQ7QUFFckQsTUFBTSxjQUFjO0lBQ1YsaUJBQWlCLEdBQStCLElBQUksQ0FBQztJQUVyRCxjQUFjO1FBQ3BCLElBQUksSUFBSSxDQUFDLGlCQUFpQixLQUFLLElBQUksRUFBRTtZQUNuQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsNkJBQWEsQ0FBQyxhQUFhLENBQUMsaUJBQU8sQ0FBQyxDQUFDO1NBQy9EO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRO1FBQ1osSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsQ0FBQztZQUNwRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixzQkFBVyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNyRCxPQUFPLENBQUMsQ0FBQztTQUNWO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxLQUFVO1FBQ2pDLElBQUk7WUFDRixJQUFJLElBQUksR0FBRyxJQUFBLHNCQUFXLEVBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLElBQUksSUFBSSxHQUFHLElBQUEsc0JBQVcsRUFBQyxLQUFL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VSxDQUFDLENBQUM7Z0JBQ3JELElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRTtvQkFDMUIsTUFBTSxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQzdCO2FBQ0Y7U0FDRjtRQUNELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7Q0FDRjtBQUVZLFFBQUEsY0FBYyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYXJzZWRRcyB9IGZyb20gXCJxc1wiO1xyXG5pbXBvcnQgeyBCcmFja2V0cywgUmVwb3NpdG9yeSwgVXBkYXRlUmVzdWx0IH0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgQXBwRGF0YVNvdXJjZSB9IGZyb20gXCIuLi9kYXRhYmFzZS9BcHBEYXRhU291cmNlXCI7XHJcbmltcG9ydCB7IGFwaVdyaXRlTG9nIH0gZnJvbSBcIi4uL2xvZ2dlci93cml0ZUxvZ1wiO1xyXG5pbXBvcnQgeyBDb21tZW50IH0gZnJvbSBcIi4uL21vZGVsL0NvbW1lbnRcIjtcclxuaW1wb3J0IHsgSW1hZ2VHYWxsZXJ5IH0gZnJvbSBcIi4uL21vZGVsL0ltYWdlR2FsbGVyeVwiO1xyXG5pbXBvcnQgeyBNZXRhRGV0YSB9IGZyb20gXCIuLi9tb2RlbC9NZXRhRGF0YVwiO1xyXG5pbXBvcnQgeyBQb3N0IH0gZnJvbSBcIi4uL21vZGVsL1Bvc3RcIjtcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuLi9tb2RlbC9Qcm9kdWN0XCI7XHJcbmltcG9ydCB7IFByb2R1Y3RQcmljZSB9IGZyb20gXCIuLi9tb2RlbC9Qcm9kdWN0UHJpY2VcIjtcclxuaW1wb3J0IHsgU3BlY2lmaWNhdGlvbiB9IGZyb20gXCIuLi9tb2RlbC9TcGVjaWZpY2F0aW9uXCI7XHJcbmltcG9ydCB7IFRyYWNrUHJvZHVjdFZpc2l0IH0gZnJvbSBcIi4uL21vZGVsL1RyYWNrUHJvZHVjdFZpc2l0XCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWwvVXNlclwiO1xyXG5pbXBvcnQgeyBlc0dldE51bWJlciwgZXNJc0VtcHR5IH0gZnJvbSBcIi4uL3V0aWxzL2VzSGVscGVyXCI7XHJcbmltcG9ydCB7IGJyYW5kU2VydmljZSB9IGZyb20gXCIuL2JyYW5kLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgY2F0ZWdvcnlTZXJ2aWNlIH0gZnJvbSBcIi4vY2F0ZWdvcnkuc2VydmljZVwiO1xyXG5cclxuY2xhc3MgUHJvZHVjdFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgcHJvZHVjdFJlcG9zaXRvcnk6IFJlcG9zaXRvcnk8UHJvZHVjdD4gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBpbml0UmVwb3NpdG9yeSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnByb2R1Y3RSZXBvc2l0b3J5ID09PSBudWxsKSB7XHJcbiAgICAgIHRoaXMucHJvZHVjdFJlcG9zaXRvcnkgPSBBcHBEYXRhU291cmNlLmdldFJlcG9zaXRvcnkoUHJvZHVjdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRDb3VudCgpIHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgdGhpcy5wcm9kdWN0UmVwb3NpdG9yeT8uY291bnQoKTtcclxuICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiRXJyb3IgUHJvZHVjdCBDb3VudCBFcnJvciBcIiwgZXJyKTtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRBbGxQcm9kdWN0QnJhbmQocXVlcnk6IGFueSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IHNraXAgPSBlc0dldE51bWJlcihxdWVyeS5zdGFydCk7XHJcbiAgICAgIGxldCB0YWtlID0gZXNHZXROdW1iZXIocXVlcnkuZW5kKTtcclxuICAgICAgbGV0IGJyYW5kID0gcXVlcnkuYnJhbmQ7XHJcbiAgICAgIGxldCBvZHIgPSAhZXNJc0VtcHR5KHF1ZXJ5Lm9kcikgPyBxdWVyeS5vZHIgOiBcIkRFU0NcIjtcclxuXHJcbiAgICAgIGxldCBwcm9kdWN0cyA9IG51bGw7XHJcbiAgICAgIGlmICh0YWtlID4gMCkge1xyXG4gICAgICAgIHByb2R1Y3RzID0gYXdhaXQgQXBwRGF0YVNvdXJjZS5jcmVhdGVRdWVyeUJ1aWxkZXIoUHJvZHVjdCwgXCJwcm9kdWN0XCIpXHJcbiAgICAgICAgICAud2hlcmUoXCJwcm9kdWN0LmJyYW5kID0gOmJyYW5kXCIsIHsgYnJhbmQgfSlcclxuICAgICAgICAgIC5sZWZ0Sm9pbkFuZFNlbGVjdChcInByb2R1Y3QuY2F0ZWdvcnlcIiwgXCJjYXRlZ29yeVwiKVxyXG4gICAgICAgICAgLm9yZGVyQnkoXCJwcm9kdWN0LmNyZWF0ZURhdGVcIiwgb2RyKVxyXG4gICAgICAgICAgLnNraXAoc2tpcClcclxuICAgICAgICAgIC50YWtlKHRha2UpXHJcbiAgICAgICAgICAuZ2V0TWFueSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHByb2R1Y3RzID0gYXdhaXQgQXBwRGF0YVNvdXJjZS5jcmVhdGVRdWVyeUJ1aWxkZXIoUHJvZHVjdCwgXCJwcm9kdWN0XCIpXHJcbiAgICAgICAgICAud2hlcmUoXCJwcm9kdWN0LmJyYW5kID0gOmJyYW5kXCIsIHsgYnJhbmQgfSlcclxuICAgICAgICAgIC5sZWZ0Sm9pbkFuZFNlbGVjdChcInByb2R1Y3QuY2F0ZWdvcnlcIiwgXCJjYXRlZ29yeVwiKVxyXG4gICAgICAgICAgLm9yZGVyQnkoXCJwcm9kdWN0LmNyZWF0ZURhdGVcIiwgb2RyKVxyXG4gICAgICAgICAgLmdldE1hbnkoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHByb2R1Y3RzO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJHZXRpbmcgU2VhcmNoIFByb2R1Y3RzIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0UHJvZHVjdFNpdGVNYXBJdGVtcyhxdWVyeTogYW55KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgc2tpcCA9IGVzR2V0TnVtYmVyKHF1ZXJ5LnN0YXJ0KTtcclxuICAgICAgbGV0IHRha2UgPSBlc0dldE51bWJlcihxdWVyeS5lbmQpO1xyXG4gICAgICBsZXQgb2RyID0gIWVzSXNFbXB0eShxdWVyeS5vZHIpID8gcXVlcnkub2RyIDogXCJERVNDXCI7XHJcblxyXG4gICAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IEFwcERhdGFTb3VyY2UuY3JlYXRlUXVlcnlCdWlsZGVyKFxyXG4gICAgICAgIFByb2R1Y3QsXHJcbiAgICAgICAgXCJwcm9kdWN0XCJcclxuICAgICAgKVxyXG4gICAgICAgIC5zZWxlY3QoW1xyXG4gICAgICAgICAgXCJwcm9kdWN0LmlkXCIsXHJcbiAgICAgICAgICBcInByb2R1Y3QuYWxpYXNOYW1lXCIsXHJcbiAgICAgICAgICBcInByb2R1Y3QudGl0bGVcIixcclxuICAgICAgICAgIFwicHJvZHVjdC5jcmVhdGVEYXRlXCIsXHJcbiAgICAgICAgICBcInByb2R1Y3QudXBkYXRlRGF0ZVwiLFxyXG4gICAgICAgIF0pXHJcbiAgICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KFwicHJvZHVjdC5jYXRlZ29yeVwiLCBcImNhdGVnb3J5XCIpXHJcbiAgICAgICAgLm9yZGVyQnkoXCJwcm9kdWN0LmNyZWF0ZURhdGVcIiwgb2RyKVxyXG4gICAgICAgIC5za2lwKHNraXApXHJcbiAgICAgICAgLnRha2UodGFrZSlcclxuICAgICAgICAuZ2V0TWFueSgpO1xyXG5cclxuICAgICAgcmV0dXJuIHByb2R1Y3RzO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJHZXRpbmcgU2VhcmNoIFByb2R1Y3RzIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0UHJvZHVjdFNlYXJjaFF1ZXJ5KHF1ZXJ5OiBhbnkpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHF1ZXJ5ID0gYCUke3F1ZXJ5fSVgO1xyXG5cclxuICAgICAgY29uc3QgcHJvZHVjdHMgPSBhd2FpdCBBcHBEYXRhU291cmNlLmNyZWF0ZVF1ZXJ5QnVpbGRlcihcclxuICAgICAgICBQcm9kdWN0LFxyXG4gICAgICAgIFwicHJvZHVjdFwiXHJcbiAgICAgIClcclxuICAgICAgICAud2hlcmUoXCJwcm9kdWN0LnRpdGxlIGxpa2UgOnF1ZXJ5XCIsIHsgcXVlcnkgfSlcclxuICAgICAgICAubGVmdEpvaW5BbmRTZWxlY3QoXCJwcm9kdWN0LnByaWNlc1wiLCBcInByaWNlc1wiKVxyXG4gICAgICAgIC5sZWZ0Sm9pbkFuZFNlbGVjdChcInByb2R1Y3QuY2F0ZWdvcnlcIiwgXCJjYXRlZ29yeVwiKVxyXG4gICAgICAgIC5vcmRlckJ5KFwicHJvZHVjdC5jcmVhdGVEYXRlXCIsIFwiREVTQ1wiKVxyXG4gICAgICAgIC5nZXRNYW55KCk7XHJcblxyXG4gICAgICByZXR1cm4gcHJvZHVjdHM7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkdldGluZyBTZWFyY2ggUHJvZHVjdHMgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQcm9kdWN0U2VhcmNoT3B0aW9ucygpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3RzID0gYXdhaXQgQXBwRGF0YVNvdXJjZS5jcmVhdGVRdWVyeUJ1aWxkZXIoXHJcbiAgICAgICAgUHJvZHVjdCxcclxuICAgICAgICBcInByb2R1Y3RcIlxyXG4gICAgICApXHJcbiAgICAgICAgLnNlbGVjdChbXCJwcm9kdWN0LnRpdGxlXCIsIFwicHJvZHVjdC5hbGlhc05hbWVcIl0pXHJcbiAgICAgICAgLm9yZGVyQnkoXCJwcm9kdWN0LmNyZWF0ZURhdGVcIiwgXCJERVNDXCIpXHJcbiAgICAgICAgLmdldE1hbnkoKTtcclxuXHJcbiAgICAgIHJldHVybiBwcm9kdWN0cztcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiR2V0aW5nIFNlYXJjaCBQcm9kdWN0cyBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmVWaXNpdENvdW50KGlkOiBudW1iZXIsIGFsaWFzTmFtZTogc3RyaW5nKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBwcmV2VmlzaXQgPSBhd2FpdCBBcHBEYXRhU291cmNlLmdldFJlcG9zaXRvcnkoXHJcbiAgICAgICAgVHJhY2tQcm9kdWN0VmlzaXRcclxuICAgICAgKS5maW5kT25lKHsgd2hlcmU6IHsgcElkOiBpZCB9IH0pO1xyXG5cclxuICAgICAgaWYgKHByZXZWaXNpdCkge1xyXG4gICAgICAgIGxldCBuVmlzaXRzID0gcHJldlZpc2l0LnZpc2l0cyArIDE7XHJcbiAgICAgICAgQXBwRGF0YVNvdXJjZS5jcmVhdGVRdWVyeUJ1aWxkZXIoKVxyXG4gICAgICAgICAgLnVwZGF0ZShUcmFja1Byb2R1Y3RWaXNpdClcclxuICAgICAgICAgIC5zZXQoeyB2aXNpdHM6IG5WaXNpdHMgfSlcclxuICAgICAgICAgIC53aGVyZShcImlkPSA6aWRcIiwgeyBpZDogcHJldlZpc2l0LmlkIH0pXHJcbiAgICAgICAgICAuZXhlY3V0ZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHZpc2l0ID0gbmV3IFRyYWNrUHJvZHVjdFZpc2l0KCk7XHJcbiAgICAgICAgdmlzaXQubmFtZSA9IGFsaWFzTmFtZTtcclxuICAgICAgICB2aXNpdC52aXNpdHMgPSAxO1xyXG4gICAgICAgIHZpc2l0LnBJZCA9IGlkO1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gQXBwRGF0YVNvdXJjZS5tYW5hZ2VyLmNyZWF0ZShUcmFja1Byb2R1Y3RWaXNpdCwgdmlzaXQpO1xyXG4gICAgICAgIEFwcERhdGFTb3VyY2UubWFuYWdlci5zYXZlKHF1ZXJ5KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJBZGQgVmlzaXQgQ291bnQgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEFsbEJ5UHJpY2VSYW5nZShxdWVyeTogYW55KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgbWluUHJpY2UgPSBlc0dldE51bWJlcihxdWVyeS5zdGFydCksXHJcbiAgICAgICAgbWF4UHJpY2UgPSBlc0dldE51bWJlcihxdWVyeS5lbmQpO1xyXG4gICAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IEFwcERhdGFTb3VyY2UuY3JlYXRlUXVlcnlCdWlsZGVyKFxyXG4gICAgICAgIFByb2R1Y3QsXHJcbiAgICAgICAgXCJwcm9kdWN0XCJcclxuICAgICAgKVxyXG4gICAgICAgIC5sZWZ0Sm9pbkFuZFNlbGVjdChcInByb2R1Y3QucHJpY2VzXCIsIFwicHJpY2VzXCIpXHJcbiAgICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KFwicHJvZHVjdC5jYXRlZ29yeVwiLCBcImNhdGVnb3J5XCIpXHJcbiAgICAgICAgLndoZXJlKFwiY2F0ZWdvcnkua2V5ID0gOmNhdFwiLCB7IGNhdDogcXVlcnkuY2F0IH0pXHJcbiAgICAgICAgLmFuZFdoZXJlKFxyXG4gICAgICAgICAgbmV3IEJyYWNrZXRzKChxYikgPT4ge1xyXG4gICAgICAgICAgICBxYi53aGVyZShcInByb2R1Y3QucHJpY2UgQkVUV0VFTiA6bWluUHJpY2UgQU5EIDptYXhQcmljZVwiLCB7XHJcbiAgICAgICAgICAgICAgbWluUHJpY2UsXHJcbiAgICAgICAgICAgICAgbWF4UHJpY2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICApXHJcbiAgICAgICAgLm9yZGVyQnkoXCJwcm9kdWN0LmNyZWF0ZURhdGVcIiwgXCJERVNDXCIpXHJcbiAgICAgICAgLnRha2UoNTAwKVxyXG4gICAgICAgIC5nZXRNYW55KCk7XHJcblxyXG4gICAgICByZXR1cm4gcHJvZHVjdHM7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIlByb2R1Y3QgQnkgUmFuZ2UgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQcm9kdWN0QnlQcmljZVJhbmdlKGNhdDogYW55LCBtaW5QcmljZTogbnVtYmVyLCBtYXhQcmljZTogbnVtYmVyKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IEFwcERhdGFTb3VyY2UuY3JlYXRlUXVlcnlCdWlsZGVyKFxyXG4gICAgICAgIFByb2R1Y3QsXHJcbiAgICAgICAgXCJwcm9kdWN0XCJcclxuICAgICAgKVxyXG4gICAgICAgIC5sZWZ0Sm9pbkFuZFNlbGVjdChcInByb2R1Y3QucHJpY2VzXCIsIFwicHJpY2VzXCIpXHJcbiAgICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KFwicHJvZHVjdC5jYXRlZ29yeVwiLCBcImNhdGVnb3J5XCIpXHJcbiAgICAgICAgLndoZXJlKFwiY2F0ZWdvcnkua2V5ID0gOmNhdFwiLCB7IGNhdCB9KVxyXG4gICAgICAgIC5hbmRXaGVyZShcclxuICAgICAgICAgIG5ldyBCcmFja2V0cygocWIpID0+IHtcclxuICAgICAgICAgICAgcWIud2hlcmUoXCJwcm9kdWN0LnByaWNlIEJFVFdFRU4gOm1pblByaWNlIEFORCA6bWF4UHJpY2VcIiwge1xyXG4gICAgICAgICAgICAgIG1pblByaWNlLFxyXG4gICAgICAgICAgICAgIG1heFByaWNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5vcmRlckJ5KFwicHJvZHVjdC5jcmVhdGVEYXRlXCIsIFwiREVTQ1wiKVxyXG4gICAgICAgIC50YWtlKDUwMClcclxuICAgICAgICAuZ2V0TWFueSgpO1xyXG5cclxuICAgICAgcmV0dXJuIHByb2R1Y3RzO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJQcm9kdWN0IEJ5IFJhbmdlIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0TW9zdFZpc2l0ZWRQcm9kdWN0cyhsaW1pdDogbnVtYmVyKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB2aXNpdGVkSXRlbXMgPSBhd2FpdCBBcHBEYXRhU291cmNlLmNyZWF0ZVF1ZXJ5QnVpbGRlcihcclxuICAgICAgICBUcmFja1Byb2R1Y3RWaXNpdCxcclxuICAgICAgICBcInByb2R1Y3RWaXNpdFwiXHJcbiAgICAgIClcclxuICAgICAgICAub3JkZXJCeShcInByb2R1Y3RWaXNpdC52aXNpdHNcIiwgXCJERVNDXCIpXHJcbiAgICAgICAgLmxpbWl0KGxpbWl0KVxyXG4gICAgICAgIC5nZXRNYW55KCk7XHJcbiAgICAgIGxldCBpZHM6IG51bWJlcltdID0gW107XHJcbiAgICAgIGlmICh2aXNpdGVkSXRlbXMpIHtcclxuICAgICAgICB2aXNpdGVkSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgaWRzLnB1c2goaXRlbS5wSWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHByb2R1Y3RzID0gYXdhaXQgQXBwRGF0YVNvdXJjZS5nZXRSZXBvc2l0b3J5KFByb2R1Y3QpLmZpbmRCeUlkcyhcclxuICAgICAgICBpZHNcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHJldHVybiBwcm9kdWN0cztcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiR2V0dGluZyBFcnJvciBNb3N0VmlzaXRlZFByb2R1Y3RzIFwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldE5ld0Fycml2YWxQcm9kdWN0cyhjYXQ6IHN0cmluZykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IEFwcERhdGFTb3VyY2UuY3JlYXRlUXVlcnlCdWlsZGVyKFByb2R1Y3QsIFwicHJvZHVjdFwiKVxyXG4gICAgICAgIC5sZWZ0Sm9pbkFuZFNlbGVjdChcInByb2R1Y3QuY2F0ZWdvcnlcIiwgXCJjYXRlZ29yeVwiKVxyXG4gICAgICAgIC53aGVyZShcImNhdGVnb3J5LmtleSA9IDpjYXRcIiwgeyBjYXQgfSlcclxuICAgICAgICAub3JkZXJCeShcInByb2R1Y3QuY3JlYXRlRGF0ZVwiLCBcIkRFU0NcIilcclxuICAgICAgICAubGltaXQoOClcclxuICAgICAgICAuZ2V0TWFueSgpO1xyXG5cclxuICAgICAgcmV0dXJuIHByb2R1Y3Q7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkdldHRpbmcgRXJyb3IgU2VydmljZXMgTmV3QXJyaXZhbFByb2R1Y3RzIFwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEFsaWFzTmFtZShxdWVyeTogYW55KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkdldCBCeSBBbGlhc05hbWUgUXVlcnkgXCIsIHF1ZXJ5KTtcclxuXHJcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCBBcHBEYXRhU291cmNlLmNyZWF0ZVF1ZXJ5QnVpbGRlcihQcm9kdWN0LCBcInByb2R1Y3RcIilcclxuICAgICAgICAud2hlcmUoeyBhbGlhc05hbWU6IHF1ZXJ5IH0pXHJcbiAgICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KFwicHJvZHVjdC5jYXRlZ29yeVwiLCBcImNhdGVnb3J5XCIpXHJcbiAgICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KFwicHJvZHVjdC5pbWFnZXNcIiwgXCJpbWFnZXNcIilcclxuICAgICAgICAubGVmdEpvaW5BbmRTZWxlY3QoXCJwcm9kdWN0LnByaWNlc1wiLCBcInByaWNlc1wiKVxyXG4gICAgICAgIC5sZWZ0Sm9pbkFuZFNlbGVjdChcInByb2R1Y3Quc3BlY2lmaWNhdGlvbnNcIiwgXCJzcGVjaWZpY2F0aW9uc1wiKVxyXG4gICAgICAgIC5sZWZ0Sm9pbkFuZFNlbGVjdChcInNwZWNpZmljYXRpb25zLmtleVwiLCBcImtleVwiKVxyXG4gICAgICAgIC5sZWZ0Sm9pbkFuZFNlbGVjdChcInByb2R1Y3QubWV0YURhdGFzXCIsIFwibWV0YURhdGFzXCIpXHJcbiAgICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KFwicHJvZHVjdC5hdmdSYXRpbmdcIiwgXCJhdmdSYXRpbmdcIilcclxuICAgICAgICAubGVmdEpvaW5BbmRTZWxlY3QoXCJhdmdSYXRpbmcucmF0aW5nSXRlbXNcIiwgXCJyYXRpbmdJdGVtc1wiKVxyXG4gICAgICAgIC5sZWZ0Sm9pbkFuZFNlbGVjdChcInJhdGluZ0l0ZW1zLnJhdGVLZXlcIiwgXCJyYXRlS2V5XCIpXHJcbiAgICAgICAgLmdldE9uZSgpO1xyXG5cclxuICAgICAgcmV0dXJuIHByb2R1Y3Q7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkdldHRpbmcgRXJyb3IgU2VydmljZXMgQWxpYXMgTmFtZSBcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRSZWNvbW1lbmRlZFByb2R1Y3RzKHByb2R1Y3Q6IFByb2R1Y3QpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBtYXhQcmljZSA9IHByb2R1Y3QucHJpY2UgKyA1MDAwLFxyXG4gICAgICAgIG1pblByaWNlID0gcHJvZHVjdC5wcmljZSAtIDUwMDA7XHJcbiAgICAgIG1pblByaWNlID0gbWluUHJpY2UgPiAwID8gbWluUHJpY2UgOiAwO1xyXG4gICAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IEFwcERhdGFTb3VyY2UuY3JlYXRlUXVlcnlCdWlsZGVyKFxyXG4gICAgICAgIFByb2R1Y3QsXHJcbiAgICAgICAgXCJwcm9kdWN0XCJcclxuICAgICAgKVxyXG5cclxuICAgICAgICAubGVmdEpvaW5BbmRTZWxlY3QoXCJwcm9kdWN0LmNhdGVnb3J5XCIsIFwiY2F0ZWdvcnlcIilcclxuICAgICAgICAud2hlcmUoXCJjYXRlZ29yeS5rZXkgPSA6Y2F0XCIsIHsgY2F0OiBwcm9kdWN0Py5jYXRlZ29yeT8ua2V5IH0pXHJcbiAgICAgICAgLmFuZFdoZXJlKFxyXG4gICAgICAgICAgbmV3IEJyYWNrZXRzKChxYikgPT4ge1xyXG4gICAgICAgICAgICBxYi53aGVyZShcInByb2R1Y3QucHJpY2UgQkVUV0VFTiA6bWluUHJpY2UgQU5EIDptYXhQcmljZVwiLCB7XHJcbiAgICAgICAgICAgICAgbWluUHJpY2UsXHJcbiAgICAgICAgICAgICAgbWF4UHJpY2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICApXHJcbiAgICAgICAgLm9yZGVyQnkoXCJwcm9kdWN0LmNyZWF0ZURhdGVcIiwgXCJERVNDXCIpXHJcbiAgICAgICAgLmxpbWl0KDYpXHJcbiAgICAgICAgLmdldE1hbnkoKTtcclxuICAgICAgcmV0dXJuIHByb2R1Y3RzO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJHZXR0aW5nIFJlY29tbWVuZGVkIEVycm9yIFByb2R1Y3RzIFwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZENvbW1lbnQoY29tbWVudDogQ29tbWVudCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgaW5pdENvbW1lbnQgPSBBcHBEYXRhU291cmNlLm1hbmFnZXIuY3JlYXRlKENvbW1lbnQsIGNvbW1lbnQpO1xyXG4gICAgICBjb25zdCBkYkNvbW1lbnQgPSBhd2FpdCBBcHBEYXRhU291cmNlLm1hbmFnZXIuc2F2ZShpbml0Q29tbWVudCk7XHJcbiAgICAgIHJldHVybiBkYkNvbW1lbnQ7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkFkZCBjb21tZW50IFByb2R1Y3RTZXJ2aWNlcyBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFByb2R1Y3RCeUFsbHlOYW1lKGFsaWFzTmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgdGhpcy5wcm9kdWN0UmVwb3NpdG9yeT8uZmluZE9uZSh7XHJcbiAgICAgIHdoZXJlOiB7IGFsaWFzTmFtZSB9LFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvZHVjdDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmUocHJvZHVjdDogUGFydGlhbDxQcm9kdWN0Pikge1xyXG4gICAgbGV0IHNhdmVQcm9kdWN0OiBQcm9kdWN0IHwgdW5kZWZpbmVkIHwgbnVsbCA9IG51bGw7XHJcbiAgICBpZiAocHJvZHVjdCkge1xyXG4gICAgICBjb25zdCBuUHJvZHVjdDogUHJvZHVjdCA9IHRoaXMubWFwUHJvZHVjdChwcm9kdWN0KTtcclxuICAgICAgY29uc3QgcXVlcnlSdW5uZXIgPSBBcHBEYXRhU291cmNlLmNyZWF0ZVF1ZXJ5UnVubmVyKCk7XHJcbiAgICAgIHF1ZXJ5UnVubmVyLmNvbm5lY3QoKTtcclxuXHJcbiAgICAgIGF3YWl0IHF1ZXJ5UnVubmVyLnN0YXJ0VHJhbnNhY3Rpb24oKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IHNwZWNzOiBTcGVjaWZpY2F0aW9uW10gPSBbXTtcclxuICAgICAgICBjb25zdCBtZXRhRGF0YXM6IE1ldGFEZXRhW10gPSBbXTtcclxuICAgICAgICBjb25zdCBpbWFnZXM6IEltYWdlR2FsbGVyeVtdID0gW107XHJcblxyXG4gICAgICAgIGxldCB1c2VyID0gYXdhaXQgcXVlcnlSdW5uZXIubWFuYWdlci5maW5kT25lKFVzZXIsIHtcclxuICAgICAgICAgIHdoZXJlOiB7IGlkOiAxIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vU2F2ZSBOZXcgTWV0YXRkYXRhXHJcblxyXG4gICAgICAgIGlmIChwcm9kdWN0Lm1ldGFEYXRhcykge1xyXG4gICAgICAgICAgcHJvZHVjdC5tZXRhRGF0YXMuZm9yRWFjaChhc3luYyAoaXRlbSwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmlkID4gMCkge1xyXG4gICAgICAgICAgICAgIG5Qcm9kdWN0LmFkZE1ldGFEYXRhKGl0ZW0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGluc01ldGFEYXRhID0gcXVlcnlSdW5uZXIubWFuYWdlci5jcmVhdGUoTWV0YURldGEsIGl0ZW0pO1xyXG4gICAgICAgICAgICAgIG1ldGFEYXRhcy5wdXNoKGluc01ldGFEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtZXRhRGF0YUxpc3QgPSBhd2FpdCBxdWVyeVJ1bm5lci5tYW5hZ2VyLnNhdmUoXHJcbiAgICAgICAgICBNZXRhRGV0YSxcclxuICAgICAgICAgIG1ldGFEYXRhc1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIG5Qcm9kdWN0LmFkZEFsbE1ldGFEYXRhKG1ldGFEYXRhTGlzdCk7XHJcblxyXG4gICAgICAgIGlmICh1c2VyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBuUHJvZHVjdC51c2VyID0gdXNlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwcm9kdWN0LmltYWdlcykge1xyXG4gICAgICAgICAgcHJvZHVjdC5pbWFnZXMuZm9yRWFjaCgoaW1hZ2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKGltYWdlLmlkID4gMCkge1xyXG4gICAgICAgICAgICAgIG5Qcm9kdWN0LmFkZEltYWdlKGltYWdlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zdCBpbnNJbWFnZSA9IHF1ZXJ5UnVubmVyLm1hbmFnZXIuY3JlYXRlKEltYWdlR2FsbGVyeSwgaW1hZ2UpO1xyXG4gICAgICAgICAgICAgIGltYWdlcy5wdXNoKGluc0ltYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgYXdhaXQgcXVlcnlSdW5uZXIubWFuYWdlci5zYXZlKEltYWdlR2FsbGVyeSwgaW1hZ2VzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaW5zUHJvZHVjdCA9IHF1ZXJ5UnVubmVyLm1hbmFnZXIuY3JlYXRlKFByb2R1Y3QsIG5Qcm9kdWN0KTtcclxuICAgICAgICBzYXZlUHJvZHVjdCA9IGF3YWl0IHF1ZXJ5UnVubmVyLm1hbmFnZXIuc2F2ZShpbnNQcm9kdWN0KTtcclxuICAgICAgICBsZXQgcElkID0gMDtcclxuICAgICAgICBpZiAoc2F2ZVByb2R1Y3QgIT09IG51bGwgJiYgc2F2ZVByb2R1Y3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcElkID0gc2F2ZVByb2R1Y3QuaWQgIT09IHVuZGVmaW5lZCA/IE51bWJlcihzYXZlUHJvZHVjdC5pZCkgOiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGJQcm9kdXQ6IFByb2R1Y3QgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHByb2R1Y3QuaW1hZ2VzICYmIHBJZCA+IDApIHtcclxuICAgICAgICAgIGRiUHJvZHV0ID0gYXdhaXQgcXVlcnlSdW5uZXIubWFuYWdlci5maW5kT25lKFByb2R1Y3QsIHtcclxuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IHBJZCB9LFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTYXZlIHNwZWNpZmljYXRpb25zXHJcbiAgICAgICAgaWYgKHByb2R1Y3Quc3BlY2lmaWNhdGlvbnMpIHtcclxuICAgICAgICAgIHByb2R1Y3Quc3BlY2lmaWNhdGlvbnMuZm9yRWFjaChhc3luYyAoc3BlYykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGJQcm9kdXQgIT09IHVuZGVmaW5lZCAmJiBkYlByb2R1dCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwZWMucHJvZHVjdCA9IGRiUHJvZHV0O1xyXG4gICAgICAgICAgICAgIGNvbnN0IGluc1NwZWMgPSBxdWVyeVJ1bm5lci5tYW5hZ2VyLmNyZWF0ZShTcGVjaWZpY2F0aW9uLCBzcGVjKTtcclxuICAgICAgICAgICAgICBjb25zdCBkYlNwZWMgPSBhd2FpdCBxdWVyeVJ1bm5lci5tYW5hZ2VyLnNhdmUoaW5zU3BlYyk7XHJcbiAgICAgICAgICAgICAgaWYgKGRiU3BlYyAhPT0gdW5kZWZpbmVkICYmIGRiU3BlYyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgc3BlY3MucHVzaChkYlNwZWMpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCBxdWVyeVJ1bm5lci5jb21taXRUcmFuc2FjdGlvbigpO1xyXG4gICAgICAgIHNhdmVQcm9kdWN0LmFkZEFsbEltYWdlKGltYWdlcyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJQcm9kdWN0IFNhdmUgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgICBhd2FpdCBxdWVyeVJ1bm5lci5yb2xsYmFja1RyYW5zYWN0aW9uKCk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJRdWVyeSBSdW5uZXIgXCIsIHF1ZXJ5UnVubmVyLmlzUmVsZWFzZWQpO1xyXG4gICAgICAgIGlmIChxdWVyeVJ1bm5lci5pc1JlbGVhc2VkKSB7XHJcbiAgICAgICAgICBhd2FpdCBxdWVyeVJ1bm5lci5yZWxlYXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2F2ZVByb2R1Y3Q7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRCeUlkKGlkOiBudW1iZXIpOiBQcm9taXNlPFByb2R1Y3QgfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgdGhpcy5wcm9kdWN0UmVwb3NpdG9yeT8uZmluZE9uZSh7XHJcbiAgICAgICAgd2hlcmU6IHsgaWQ6IGlkIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcHJvZHVjdDtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkVycm9yIGdldHByb2R1Y3RCeUlEIFwiLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEFsbChxdWVyeTogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgY291bnQsIGNhdCwgcGFnZSB9ID0gcXVlcnk7XHJcblxyXG4gICAgICBsZXQgb2Zmc2V0ID0gZXNHZXROdW1iZXIoc3RhcnQpO1xyXG4gICAgICBsZXQgbGltaXQgPSBlc0dldE51bWJlcihlbmQpO1xyXG4gICAgICBsZXQgcHJvZHVjdHMgPSBudWxsLFxyXG4gICAgICAgIHByb2R1Y3RDb3VudCA9IDA7XHJcblxyXG4gICAgICBjb25zdCBjYXRlZ29yaWVzID0gYXdhaXQgY2F0ZWdvcnlTZXJ2aWNlLmdldEFsbENhdGVnb3J5QXNTdHJpbmdBcnJheSgpO1xyXG4gICAgICBpZiAoIWVzSXNFbXB0eShjYXQpKSB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2F0ZWdvcmllcykpIHtcclxuICAgICAgICAgIGlmIChjYXRlZ29yaWVzLmluY2x1ZGVzKGNhdCkpIHtcclxuICAgICAgICAgICAgaWYgKGxpbWl0ID4gMCkge1xyXG4gICAgICAgICAgICAgIHByb2R1Y3RzID0gYXdhaXQgQXBwRGF0YVNvdXJjZS5jcmVhdGVRdWVyeUJ1aWxkZXIoXHJcbiAgICAgICAgICAgICAgICBQcm9kdWN0LFxyXG4gICAgICAgICAgICAgICAgXCJwcm9kdWN0XCJcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAubGVmdEpvaW5BbmRTZWxlY3QoXCJwcm9kdWN0LnByaWNlc1wiLCBcInByaWNlc1wiKVxyXG4gICAgICAgICAgICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KFwicHJvZHVjdC5jYXRlZ29yeVwiLCBcImNhdGVnb3J5XCIpXHJcbiAgICAgICAgICAgICAgICAud2hlcmUoXCJjYXRlZ29yeS5rZXkgPSA6a2V5XCIsIHsga2V5OiBjYXQgfSlcclxuICAgICAgICAgICAgICAgIC5vcmRlckJ5KFwicHJvZHVjdC5jcmVhdGVEYXRlXCIsIFwiREVTQ1wiKVxyXG4gICAgICAgICAgICAgICAgLnNraXAob2Zmc2V0KVxyXG4gICAgICAgICAgICAgICAgLnRha2UobGltaXQpXHJcbiAgICAgICAgICAgICAgICAuZ2V0TWFueSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHByb2R1Y3RzID0gYXdhaXQgQXBwRGF0YVNvdXJjZS5jcmVhdGVRdWVyeUJ1aWxkZXIoXHJcbiAgICAgICAgICAgICAgICBQcm9kdWN0LFxyXG4gICAgICAgICAgICAgICAgXCJwcm9kdWN0XCJcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAubGVmdEpvaW5BbmRTZWxlY3QoXCJwcm9kdWN0LnByaWNlc1wiLCBcInByaWNlc1wiKVxyXG4gICAgICAgICAgICAgICAgLmxlZnRKb2luQW5kU2VsZWN0KFwicHJvZHVjdC5jYXRlZ29yeVwiLCBcImNhdGVnb3J5XCIpXHJcbiAgICAgICAgICAgICAgICAud2hlcmUoXCJjYXRlZ29yeS5rZXkgPSA6a2V5XCIsIHsga2V5OiBjYXQgfSlcclxuICAgICAgICAgICAgICAgIC5vcmRlckJ5KFwicHJvZHVjdC5jcmVhdGVEYXRlXCIsIFwiREVTQ1wiKVxyXG4gICAgICAgICAgICAgICAgLmdldE1hbnkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAobGltaXQgPiAwKSB7XHJcbiAgICAgICAgICBwcm9kdWN0cyA9IGF3YWl0IEFwcERhdGFTb3VyY2UuY3JlYXRlUXVlcnlCdWlsZGVyKFByb2R1Y3QsIFwicHJvZHVjdFwiKVxyXG4gICAgICAgICAgICAubGVmdEpvaW5BbmRTZWxlY3QoXCJwcm9kdWN0LnByaWNlc1wiLCBcInByaWNlc1wiKVxyXG4gICAgICAgICAgICAubGVmdEpvaW5BbmRTZWxlY3QoXCJwcm9kdWN0LmNhdGVnb3J5XCIsIFwiY2F0ZWdvcnlcIilcclxuICAgICAgICAgICAgLm9yZGVyQnkoXCJwcm9kdWN0LmNyZWF0ZURhdGVcIiwgXCJERVNDXCIpXHJcbiAgICAgICAgICAgIC5za2lwKG9mZnNldClcclxuICAgICAgICAgICAgLnRha2UobGltaXQpXHJcbiAgICAgICAgICAgIC5nZXRNYW55KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHByb2R1Y3RzID0gYXdhaXQgQXBwRGF0YVNvdXJjZS5jcmVhdGVRdWVyeUJ1aWxkZXIoUHJvZHVjdCwgXCJwcm9kdWN0XCIpXHJcbiAgICAgICAgICAgIC5sZWZ0Sm9pbkFuZFNlbGVjdChcInByb2R1Y3QuY2F0ZWdvcnlcIiwgXCJjYXRlZ29yeVwiKVxyXG4gICAgICAgICAgICAub3JkZXJCeShcInByb2R1Y3QuY3JlYXRlRGF0ZVwiLCBcIkRFU0NcIilcclxuICAgICAgICAgICAgLmdldE1hbnkoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjb3VudCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgIGlmICghZXNJc0VtcHR5KGNhdCkpIHtcclxuICAgICAgICAgIHByb2R1Y3RDb3VudCA9IGF3YWl0IEFwcERhdGFTb3VyY2UuY3JlYXRlUXVlcnlCdWlsZGVyKFxyXG4gICAgICAgICAgICBQcm9kdWN0LFxyXG4gICAgICAgICAgICBcInByb2R1Y3RcIlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICAgICAuaW5uZXJKb2luKFwicHJvZHVjdC5jYXRlZ29yeVwiLCBcImNhdGVnb3J5XCIpXHJcbiAgICAgICAgICAgIC53aGVyZShcImNhdGVnb3J5LmtleSA9IDpjYXRcIiwgeyBjYXQgfSlcclxuICAgICAgICAgICAgLmdldENvdW50KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHByb2R1Y3RDb3VudCA9IGF3YWl0IEFwcERhdGFTb3VyY2UuY3JlYXRlUXVlcnlCdWlsZGVyKFxyXG4gICAgICAgICAgICBQcm9kdWN0LFxyXG4gICAgICAgICAgICBcInByb2R1Y3RcIlxyXG4gICAgICAgICAgKS5nZXRDb3VudCgpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwcm9kdWN0Q291bnQgXCIsIHByb2R1Y3RDb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgcGhvbmVQcm9kdWN0cyA9IG51bGwsXHJcbiAgICAgICAgbWl4UHJvZHVjdHMgPSBudWxsLFxyXG4gICAgICAgIGJyYW5kcyA9IG51bGw7XHJcbiAgICAgIGlmIChwYWdlID09PSBcImhvbWVcIikge1xyXG4gICAgICAgIHBob25lUHJvZHVjdHMgPSBhd2FpdCB0aGlzLmdldEZlYXR1cmVzUHJvZHVjdHNCeUNhdChcIlNtYXJ0UGhvbmVcIiwgOCk7XHJcbiAgICAgICAgbWl4UHJvZHVjdHMgPSBhd2FpdCB0aGlzLmdldEZlYXR1cmVzUHJvZHVjdHNCeUNhdChudWxsLCA4KTtcclxuICAgICAgfVxyXG4gICAgICBicmFuZHMgPSBhd2FpdCBicmFuZFNlcnZpY2UuZ2V0QWxsQnJhbmQoKTtcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcHJvZHVjdHM6IHByb2R1Y3RzLFxyXG4gICAgICAgIGNvdW50OiBwcm9kdWN0Q291bnQsXHJcbiAgICAgICAgZlByb2R1Y3Q6IG1peFByb2R1Y3RzLFxyXG4gICAgICAgIHJTUHJvZHVjdDogcGhvbmVQcm9kdWN0cyxcclxuICAgICAgICBicmFuZHMsXHJcbiAgICAgIH07XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoYEVycm9yIEFsbCBwcm9kdWN0IGAsIGVycik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0RmVhdHVyZXNQcm9kdWN0c0J5Q2F0KGNhdDogYW55LCB0YWtlOiBudW1iZXIpIHtcclxuICAgIGxldCBwcm9kdWN0cyA9IG51bGw7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKCFlc0lzRW1wdHkoY2F0KSkge1xyXG4gICAgICAgIHByb2R1Y3RzID0gYXdhaXQgQXBwRGF0YVNvdXJjZS5jcmVhdGVRdWVyeUJ1aWxkZXIoUHJvZHVjdCwgXCJwcm9kdWN0XCIpXHJcbiAgICAgICAgICAubGVmdEpvaW5BbmRTZWxlY3QoXCJwcm9kdWN0LmNhdGVnb3J5XCIsIFwiY2F0ZWdvcnlcIilcclxuICAgICAgICAgIC53aGVyZShcImNhdGVnb3J5LmtleSA9IDpjYXRcIiwgeyBjYXQgfSlcclxuICAgICAgICAgIC5vcmRlckJ5KFwicHJvZHVjdC5jcmVhdGVEYXRlXCIsIFwiREVTQ1wiKVxyXG4gICAgICAgICAgLnRha2UodGFrZSlcclxuICAgICAgICAgIC5nZXRNYW55KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHJvZHVjdHMgPSBhd2FpdCBBcHBEYXRhU291cmNlLmNyZWF0ZVF1ZXJ5QnVpbGRlcihQcm9kdWN0LCBcInByb2R1Y3RcIilcclxuICAgICAgICAgIC5sZWZ0Sm9pbkFuZFNlbGVjdChcInByb2R1Y3QuY2F0ZWdvcnlcIiwgXCJjYXRlZ29yeVwiKVxyXG4gICAgICAgICAgLm9yZGVyQnkoXCJwcm9kdWN0LmNyZWF0ZURhdGVcIiwgXCJERVNDXCIpXHJcbiAgICAgICAgICAudGFrZSh0YWtlKVxyXG4gICAgICAgICAgLmdldE1hbnkoKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJnZXRGZWF0dXJlc1Byb2R1Y3RzQnlDYXQgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHJvZHVjdHM7XHJcbiAgfVxyXG5cclxuICBhc3luYyB1cGRhdGUoXHJcbiAgICBwcm9kdWN0OiBQYXJ0aWFsPFByb2R1Y3Q+XHJcbiAgKTogUHJvbWlzZTxVcGRhdGVSZXN1bHQgfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICBpZiAoIWVzSXNFbXB0eShwcm9kdWN0KSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZXByb2R1Y3QgPSBhd2FpdCB0aGlzLnByb2R1Y3RSZXBvc2l0b3J5Py51cGRhdGUoXHJcbiAgICAgICAgICB7IGlkOiBwcm9kdWN0LmlkIH0sXHJcbiAgICAgICAgICBwcm9kdWN0XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHVwZGF0ZXByb2R1Y3Q7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoYFVwZGF0ZSBwcm9kdWN0IEVycm9yLCBgLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgYXN5bmMgZGVsZXRlKGlkOiBudW1iZXIpIHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3RzID0gYXdhaXQgdGhpcy5wcm9kdWN0UmVwb3NpdG9yeT8uZGVsZXRlKHsgaWQ6IGlkIH0pO1xyXG4gICAgICByZXR1cm4gcHJvZHVjdHM7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJFcnJvciBBbGwgcHJvZHVjdCBcIiwgZXJyKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1hcFByb2R1Y3QocHJvZHVjdDogUGFydGlhbDxQcm9kdWN0Pik6IFByb2R1Y3Qge1xyXG4gICAgY29uc3QgblByb2R1Y3QgPSBuZXcgUHJvZHVjdCgpO1xyXG5cclxuICAgIGlmIChwcm9kdWN0LmJyYW5kICE9PSB1bmRlZmluZWQgJiYgcHJvZHVjdC5icmFuZCAhPT0gbnVsbCkge1xyXG4gICAgICBuUHJvZHVjdC5icmFuZCA9IHByb2R1Y3QuYnJhbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3QuY2F0ZWdvcnkgIT09IG51bGwgJiYgcHJvZHVjdC5jYXRlZ29yeSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG5Qcm9kdWN0LmNhdGVnb3J5ID0gcHJvZHVjdC5jYXRlZ29yeTtcclxuICAgIH1cclxuXHJcbiAgICBuUHJvZHVjdC50aXRsZSA9IHByb2R1Y3QudGl0bGUgPyBwcm9kdWN0LnRpdGxlIDogXCJcIjtcclxuICAgIG5Qcm9kdWN0LmRlc2NyaXB0aW9uID0gcHJvZHVjdC5kZXNjcmlwdGlvbiA/IHByb2R1Y3QuZGVzY3JpcHRpb24gOiBcIlwiO1xyXG4gICAgblByb2R1Y3QuZGlzY291bnRTdGF0dXMgPSBwcm9kdWN0LmRpc2NvdW50U3RhdHVzXHJcbiAgICAgID8gcHJvZHVjdC5kaXNjb3VudFN0YXR1c1xyXG4gICAgICA6IGZhbHNlO1xyXG4gICAgblByb2R1Y3QubW9kZWwgPSBwcm9kdWN0Lm1vZGVsID8gcHJvZHVjdC5tb2RlbCA6IFwiXCI7XHJcblxyXG4gICAgblByb2R1Y3QucXVhbnRpdHkgPSBwcm9kdWN0LnF1YW50aXR5ID8gTnVtYmVyKHByb2R1Y3QucXVhbnRpdHkpIDogMDtcclxuICAgIGlmIChwcm9kdWN0LmFsaWFzTmFtZSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3QuYWxpYXNOYW1lICE9PSBudWxsKSB7XHJcbiAgICAgIG5Qcm9kdWN0LmFsaWFzTmFtZSA9IHByb2R1Y3QuYWxpYXNOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuUHJvZHVjdDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmVWaWFKc29uKHByb2R1Y3Q6IFByb2R1Y3QpOiBQcm9taXNlPFByb2R1Y3QgfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICBsZXQgc2F2ZVByb2R1Y3Q6IFByb2R1Y3QgfCB1bmRlZmluZWQgfCBudWxsID0gbnVsbDtcclxuICAgIGlmIChwcm9kdWN0KSB7XHJcbiAgICAgIGNvbnN0IG5Qcm9kdWN0OiBQcm9kdWN0ID0gdGhpcy5tYXBQcm9kdWN0KHByb2R1Y3QpO1xyXG4gICAgICBjb25zdCBxdWVyeVJ1bm5lciA9IEFwcERhdGFTb3VyY2UuY3JlYXRlUXVlcnlSdW5uZXIoKTtcclxuICAgICAgcXVlcnlSdW5uZXIuY29ubmVjdCgpO1xyXG5cclxuICAgICAgYXdhaXQgcXVlcnlSdW5uZXIuc3RhcnRUcmFuc2FjdGlvbigpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBsZXQgc3BlY3M6IFNwZWNpZmljYXRpb25bXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IG1ldGFEYXRhczogTWV0YURldGFbXSA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgdXNlciA9IGF3YWl0IHF1ZXJ5UnVubmVyLm1hbmFnZXIuZmluZE9uZShVc2VyLCB7XHJcbiAgICAgICAgICB3aGVyZTogeyBpZDogMSB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL1NhdmUgTmV3IE1ldGF0ZGF0YVxyXG5cclxuICAgICAgICBpZiAocHJvZHVjdC5tZXRhRGF0YXMpIHtcclxuICAgICAgICAgIHByb2R1Y3QubWV0YURhdGFzLmZvckVhY2goKGl0ZW0sIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5pZCA+IDApIHtcclxuICAgICAgICAgICAgICBuUHJvZHVjdC5hZGRNZXRhRGF0YShpdGVtKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zdCBpbnNNZXRhRGF0YSA9IHF1ZXJ5UnVubmVyLm1hbmFnZXIuY3JlYXRlKE1ldGFEZXRhLCBpdGVtKTtcclxuICAgICAgICAgICAgICBtZXRhRGF0YXMucHVzaChpbnNNZXRhRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWV0YURhdGFMaXN0ID0gYXdhaXQgcXVlcnlSdW5uZXIubWFuYWdlci5zYXZlKFxyXG4gICAgICAgICAgTWV0YURldGEsXHJcbiAgICAgICAgICBtZXRhRGF0YXNcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBuUHJvZHVjdC5hZGRBbGxNZXRhRGF0YShtZXRhRGF0YUxpc3QpO1xyXG5cclxuICAgICAgICBpZiAodXNlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgblByb2R1Y3QudXNlciA9IHVzZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpbWFnZXM6IEltYWdlR2FsbGVyeVtdID0gW107XHJcbiAgICAgICAgaWYgKHByb2R1Y3QuaW1hZ2VzKSB7XHJcbiAgICAgICAgICBwcm9kdWN0LmltYWdlcy5mb3JFYWNoKChpbWFnZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW1hZ2UuaWQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgblByb2R1Y3QuYWRkSW1hZ2UoaW1hZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGluc0ltYWdlID0gcXVlcnlSdW5uZXIubWFuYWdlci5jcmVhdGUoSW1hZ2VHYWxsZXJ5LCBpbWFnZSk7XHJcbiAgICAgICAgICAgICAgaW1hZ2VzLnB1c2goaW5zSW1hZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBjb25zdCBkYkltYWdlcyA9IHF1ZXJ5UnVubmVyLm1hbmFnZXIuc2F2ZShpbWFnZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaW5zUHJvZHVjdCA9IHF1ZXJ5UnVubmVyLm1hbmFnZXIuY3JlYXRlKFByb2R1Y3QsIG5Qcm9kdWN0KTtcclxuICAgICAgICBzYXZlUHJvZHVjdCA9IGF3YWl0IHF1ZXJ5UnVubmVyLm1hbmFnZXIuc2F2ZShpbnNQcm9kdWN0KTtcclxuICAgICAgICBsZXQgcElkID0gMDtcclxuICAgICAgICBpZiAoc2F2ZVByb2R1Y3QgIT09IG51bGwgJiYgc2F2ZVByb2R1Y3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcElkID0gc2F2ZVByb2R1Y3QuaWQgIT09IHVuZGVmaW5lZCA/IE51bWJlcihzYXZlUHJvZHVjdC5pZCkgOiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGJQcm9kdXQ6IFByb2R1Y3QgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy9TYXZlIHNwZWNpZmljYXRpb25zXHJcbiAgICAgICAgY29uc3QgbGlzdFNwZWNzOiBTcGVjaWZpY2F0aW9uW10gPSBbXTtcclxuICAgICAgICBpZiAocHJvZHVjdC5zcGVjaWZpY2F0aW9ucykge1xyXG4gICAgICAgICAgcHJvZHVjdC5zcGVjaWZpY2F0aW9ucy5mb3JFYWNoKChzcGVjOiBTcGVjaWZpY2F0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYlByb2R1dCAhPT0gdW5kZWZpbmVkICYmIGRiUHJvZHV0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgc3BlYy5wcm9kdWN0ID0gZGJQcm9kdXQ7XHJcbiAgICAgICAgICAgICAgY29uc3QgcXVlcnlTcGVjID0gcXVlcnlSdW5uZXIubWFuYWdlci5jcmVhdGUoU3BlY2lmaWNhdGlvbiwgc3BlYyk7XHJcbiAgICAgICAgICAgICAgbGlzdFNwZWNzLnB1c2gocXVlcnlTcGVjKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgY29uc3QgZGJTcGVjID0gYXdhaXQgcXVlcnlSdW5uZXIubWFuYWdlci5zYXZlKGxpc3RTcGVjcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1NhdmUgUHJvZHVjdCBQcmljZXNcclxuICAgICAgICBjb25zdCBwcm9kdWN0UHJpY2VMaXN0OiBQcm9kdWN0UHJpY2VbXSA9IFtdO1xyXG4gICAgICAgIGlmIChwcm9kdWN0LnByaWNlcykge1xyXG4gICAgICAgICAgcHJvZHVjdC5wcmljZXMuZm9yRWFjaCgocHJpY2U6IFByb2R1Y3RQcmljZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGJQcm9kdXQgIT09IHVuZGVmaW5lZCAmJiBkYlByb2R1dCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHByaWNlLnByb2R1Y3QgPSBkYlByb2R1dDtcclxuICAgICAgICAgICAgICBjb25zdCBxdWVyeVByb1ByaWNlID0gcXVlcnlSdW5uZXIubWFuYWdlci5jcmVhdGUoXHJcbiAgICAgICAgICAgICAgICBQcm9kdWN0UHJpY2UsXHJcbiAgICAgICAgICAgICAgICBwcmljZVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgcHJvZHVjdFByaWNlTGlzdC5wdXNoKHF1ZXJ5UHJvUHJpY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBjb25zdCBkYlByaWNlcyA9IGF3YWl0IHF1ZXJ5UnVubmVyLm1hbmFnZXIuc2F2ZShcclxuICAgICAgICAgICAgUHJvZHVjdFByaWNlLFxyXG4gICAgICAgICAgICBwcm9kdWN0UHJpY2VMaXN0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXdhaXQgcXVlcnlSdW5uZXIuY29tbWl0VHJhbnNhY3Rpb24oKTtcclxuXHJcbiAgICAgICAgc2F2ZVByb2R1Y3QuYWRkQWxsSW1hZ2UoaW1hZ2VzKTtcclxuICAgICAgICBhcGlXcml0ZUxvZy5pbmZvKFwiQWZ0ZXIgUHJvZHVjdCBTYXZlIC4uLiBcIik7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJQcm9kdWN0IFNhdmUgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgICBhd2FpdCBxdWVyeVJ1bm5lci5yb2xsYmFja1RyYW5zYWN0aW9uKCk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJRdWVyeSBSdW5uZXIgXCIsIHF1ZXJ5UnVubmVyLmlzUmVsZWFzZWQpO1xyXG4gICAgICAgIGlmIChxdWVyeVJ1bm5lci5pc1JlbGVhc2VkKSB7XHJcbiAgICAgICAgICBhd2FpdCBxdWVyeVJ1bm5lci5yZWxlYXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2F2ZVByb2R1Y3Q7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcHJvZHVjdFNlcnZpY2UgPSBuZXcgUHJvZHVjdFNlcnZpY2UoKTtcclxuIl19