import { UpdateResult } from "typeorm";
import { MetaDeta } from "../model/MetaData";
declare class MetadataService {
    private metadataRepository;
    private initRepository;
    save(metadata: Partial<MetaDeta>): Promise<(Partial<MetaDeta> & MetaDeta) | null | undefined>;
    getById(id: number): Promise<MetaDeta | null | undefined>;
    getAll(): Promise<MetaDeta[] | null | undefined>;
    update(metadata: Partial<MetaDeta>): Promise<UpdateResult | null | undefined>;
    delete(id: number): Promise<import("typeorm").DeleteResult | null | undefined>;
}
export declare const metadataService: MetadataService;
export {};
