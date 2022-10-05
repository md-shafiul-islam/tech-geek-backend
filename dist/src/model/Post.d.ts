import { Brand } from "./Brand";
import { Category } from "./Category";
import { MetaDeta } from "./MetaData";
import { ImageGallery } from "./ImageGallery";
import { User } from "./User";
export declare class Post {
    id: number;
    publicId: string;
    aliasName: string;
    title: string;
    content: string;
    user: User;
    images: ImageGallery[];
    author: User;
    metaDatas: MetaDeta[];
    brand: Brand;
    category: Category;
    createdDate: Date;
    updateDate: Date;
    addAllImage(imgs: ImageGallery[]): void;
    addImage(image: ImageGallery): void;
    addAllMetaData(metas: MetaDeta[]): void;
    addMeta(metaData: MetaDeta): void;
}
