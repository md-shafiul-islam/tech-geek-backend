import { ParsedQs } from "qs";
import { Repository } from "typeorm";
import { AppDataSource } from "../database/AppDataSource";
import { apiWriteLog } from "../logger/writeLog";
import { Brand } from "../model/Brand";
import { esIsEmpty } from "../utils/esHelper";

class BrandService {
  private brandRepository: Repository<Brand> | null = null;

  private initRepository(): void {
    if (this.brandRepository === null) {
      this.brandRepository = AppDataSource.getRepository(Brand);
    }
  }

  async getBrandByName(name: string) {
    this.initRepository();
    try {
      const brand = await this.brandRepository?.findOne({
        where: { name: name },
      });
      return brand;
    } catch (err) {
      apiWriteLog.error("Error getBrandByName ", err);
      return null;
    }
  }

  async save(brand: Partial<Brand>) {
    this.initRepository();
    if (brand) {
      try {
        const resp = await this.brandRepository?.save(brand);

        return resp;
      } catch (error) {
        apiWriteLog.error("Brand Save Failed ");
      }
    }
    return null;
  }

  async getBrandById(id: number): Promise<Brand | null | undefined> {
    this.initRepository();
    try {
      const brand = await this.brandRepository?.findOne({ where: { id: id } });
      return brand;
    } catch (err) {
      apiWriteLog.error("Error getBrandByID ", err);
      return null;
    }
  }

  async getAllBrand(): Promise<Brand[] | null | undefined> {
    this.initRepository();
    try {
      const brands = await this.brandRepository?.find();
      return brands;
    } catch (err) {
      apiWriteLog.error(`Error All Brand `, err);
      return null;
    }
  }

  async updateBrand(brand: Brand): Promise<Brand | null | undefined> {
    this.initRepository();
    if (!esIsEmpty(brand)) {
      let id: number = 0;
      id = !esIsEmpty(brand.id) ? Number(brand.id) : 0;
      if (id > 0) {
        try {
          const dbBrand = await this.brandRepository?.findOneBy({ id });
          if (dbBrand !== null && dbBrand !== undefined) {
            dbBrand.description = !esIsEmpty(brand.description)
              ? brand.description
              : dbBrand.description;
            dbBrand.logoUrl = !esIsEmpty(brand.logoUrl)
              ? brand.logoUrl
              : dbBrand.logoUrl;
            dbBrand.name = !esIsEmpty(brand.name) ? brand.name : dbBrand?.name;
            dbBrand.tagLine = !esIsEmpty(brand.tagLine)
              ? brand.tagLine
              : dbBrand.tagLine;
            dbBrand.website = !esIsEmpty(brand.website)
              ? brand.website
              : dbBrand.website;

            const updateBrand = await this.brandRepository?.save(dbBrand);
            return updateBrand;
          }
        } catch (error) {
          apiWriteLog.error(`Update Brand Error, `, error);
          return null;
        }
      }
    }
    return null;
  }
  async deleteBrand(id: number) {
    this.initRepository();
    try {
      const brands = await this.brandRepository?.delete({ id: id });
      return brands;
    } catch (err) {
      apiWriteLog.error("Error All Brand ", err);
      return null;
    }
  }
}

export const brandService = new BrandService();
