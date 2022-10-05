import { Brand } from "../model/Brand";
declare class BrandService {
    private brandRepository;
    private initRepository;
    getCount(): Promise<number | undefined>;
    getBrandByName(name: string): Promise<Brand | null | undefined>;
    save(brand: Partial<Brand>): Promise<(Partial<Brand> & Brand) | null | undefined>;
    getBrandById(id: number): Promise<Brand | null | undefined>;
    getAllBrand(): Promise<Brand[] | null | undefined>;
    updateBrand(brand: Brand): Promise<Brand | null | undefined>;
    deleteBrand(id: number): Promise<import("typeorm").DeleteResult | null | undefined>;
}
export declare const brandService: BrandService;
export {};
