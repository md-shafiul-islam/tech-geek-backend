import { UpdateResult } from "typeorm";
import { SpecKey } from "../model/SpecKey";
declare class SpecKeyService {
    private specKeyRepository;
    private initRepository;
    save(specKey: Partial<SpecKey>): Promise<(Partial<SpecKey> & SpecKey) | null | undefined>;
    getById(id: number): Promise<SpecKey | null | undefined>;
    getAll(): Promise<SpecKey[] | null | undefined>;
    update(specKey: Partial<SpecKey>): Promise<UpdateResult | null | undefined>;
    delete(id: number): Promise<import("typeorm").DeleteResult | null | undefined>;
}
export declare const specKeyService: SpecKeyService;
export {};
