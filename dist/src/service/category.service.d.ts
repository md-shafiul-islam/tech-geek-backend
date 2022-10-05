import { Category } from "../model/Category";
declare class CategoryService {
    private categoryRepository;
    private categoryTreeRepository;
    private initRepository;
    save(category: Category): Promise<Category | null | undefined>;
    getCategoryById(id: number): Promise<Category | null | undefined>;
    getAllCategoryAsStringArray(): Promise<string[] | null>;
    getCategoryTree(): Promise<Category[] | null | undefined>;
    getAllCategory(): Promise<Category[] | null | undefined>;
    updateCategory(name: string, description: string, id: number, parent: Category): Promise<Category | null | undefined>;
    deleteCategory(id: number): Promise<import("typeorm").DeleteResult | null | undefined>;
}
export declare const categoryService: CategoryService;
export {};
