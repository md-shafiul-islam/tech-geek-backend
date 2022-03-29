import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../database/AppDataSource";
import { apiWriteLog } from "../logger/writeLog";
import { Specification } from "../model/Specification";
import { esIsEmpty } from "../utils/esHelper";

class SpecificationService {
  private specificationRepository: Repository<Specification> | null = null;

  private initRepository(): void {
    if (this.specificationRepository === null) {
      this.specificationRepository = AppDataSource.getRepository(Specification);
    }
  }

  async save(specification: Partial<Specification>) {
    this.initRepository();
    if (specification) {
      try {
        const resp = await this.specificationRepository?.save(specification);

        return resp;
      } catch (error) {
        apiWriteLog.error("specification Save Failed ");
      }
    }
    return null;
  }

  async getById(id: number): Promise<Specification | null | undefined> {
    this.initRepository();
    try {
      const specification = await this.specificationRepository?.findOne({ where: { id: id } });
      return specification;
    } catch (err) {
      apiWriteLog.error("Error getspecificationByID ", err);
      return null;
    }
  }

  async getAll(): Promise<Specification[] | null | undefined> {
    this.initRepository();
    try {
      const specification = await this.specificationRepository?.find();
      return specification;
    } catch (err) {
      apiWriteLog.error(`Error All specification `, err);
      return null;
    }
  }

  async update(specification: Partial<Specification>): Promise<UpdateResult | null | undefined> {
    this.initRepository();
    if (!esIsEmpty(specification)) {
      try {
        const updatespecification = await this.specificationRepository?.update(
          { id: specification.id },
          specification
        );

        return updatespecification;
      } catch (error) {
        apiWriteLog.error(`Update specification Error, `, error);
        return null;
      }
    }

    return null;
  }
  async delete(id: number) {
    this.initRepository();
    try {
      const specifications = await this.specificationRepository?.delete({ id: id });
      return specifications;
    } catch (err) {
      apiWriteLog.error("Error All specification ", err);
      return null;
    }
  }
}

export const specificationService = new SpecificationService();
