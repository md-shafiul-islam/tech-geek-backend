import { Brand } from "./Brand";
import { Category } from "./Category";
import { MetaDeta } from "./MetaData";
import { ImageGallery } from "./ImageGallery";
import { User } from "./User";
export declare class News {
    id: number;
    aliasName: string;
    title: string;
    user: User;
    metaDatas: MetaDeta[];
    content: string;
    images: ImageGallery[];
    brand: Brand;
    category: Category;
    crateDate: Date;
    updateDate: Date;
    addImage(image: ImageGallery): void;
    addAllImage(imgs: ImageGallery[]): void;
    addMetaData(meta: MetaDeta): void;
    addAllMeta(metas: MetaDeta[]): void;
}
