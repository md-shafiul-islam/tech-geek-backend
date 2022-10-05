import { UpdateResult } from "typeorm";
import { Specification } from "../model/Specification";
declare class SpecificationService {
    private specificationRepository;
    private initRepository;
    save(specification: Partial<Specification>): Promise<(Partial<Specification> & Specification) | null | undefined>;
    getById(id: number): Promise<Specification | null | undefined>;
    getAll(): Promise<Specification[] | null | undefined>;
    update(specification: Partial<Specification>): Promise<UpdateResult | null | undefined>;
    delete(id: number): Promise<import("typeorm").DeleteResult | null | undefined>;
}
export declare const specificationService: SpecificationService;
export {};
