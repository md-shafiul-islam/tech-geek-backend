import { UpdateResult } from "typeorm";
import { SpecificationType } from "../model/SpecificationType";
declare class SpecificationTypeService {
    private specificationTypeRepository;
    private initRepository;
    save(specificationType: Partial<SpecificationType>): Promise<(Partial<SpecificationType> & SpecificationType) | null | undefined>;
    getById(id: number): Promise<SpecificationType | null | undefined>;
    getAll(): Promise<SpecificationType[] | null | undefined>;
    update(specificationType: Partial<SpecificationType>): Promise<UpdateResult | null | undefined>;
    delete(id: number): Promise<import("typeorm").DeleteResult | null | undefined>;
}
export declare const specificationTypeService: SpecificationTypeService;
export {};
