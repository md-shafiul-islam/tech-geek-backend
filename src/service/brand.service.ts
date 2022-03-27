import { Repository } from "typeorm";
import { AppDataSource } from "../database/AppDataSource";
import { Brand } from "../model/Brand";

class BrandService {
  brandRepository: Repository<Brand> | null = null;

  initRepository() {
    if (this.brandRepository === null) {
      this.brandRepository = AppDataSource.getRepository(Brand);
    }
  }

  async save(brand: Partial<Brand>) {
    this.initRepository();
    if (brand) {
      try {
        const resp = await this.brandRepository?.save(brand);

        return resp;
      } catch (error) {
        throw new Error("Brand Save Failed ");
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
      console.log("Error getBrandByID ", err);
      return null;
    }
  }

  async getAllBrand(): Promise<Brand[] | null | undefined> {
    this.initRepository();
    try {
      const brands = await this.brandRepository?.find();
      return brands;
    } catch (err) {
      console.log("Error All Brand ", err);
      return null;
    }
  }

  async deleteBrand(id:number) {
    this.initRepository();
    try {
      const brands = await this.brandRepository?.delete({id:id});
      return brands;
    } catch (err) {
      console.log("Error All Brand ", err);
      return null;
    }
  }
}

export const brandService = new BrandService();
