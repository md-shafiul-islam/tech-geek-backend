import { RateKey } from "../model/RateKey";
declare class RatingKeyService {
    private ratingKeyRepository;
    private initRepository;
    getById(id: number): Promise<RateKey | null | undefined>;
    getAll(): Promise<RateKey[] | null | undefined>;
    save(ratingKey: RateKey): Promise<RateKey | null | undefined>;
    update(rKey: RateKey): Promise<import("typeorm").UpdateResult | null | undefined>;
    delete(id: number): Promise<import("typeorm").DeleteResult | null | undefined>;
}
export declare const ratingKeyServices: RatingKeyService;
export {};
