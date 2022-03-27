import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Brand } from "./Brand";
import { Category } from "./Category";
import { MetaDeta } from "./MetaData";
import { ImageGallery } from "./ImageGallery";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity({ name: "news" })
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 205 })
  title: string;

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn({ name: "user" })
  user: User;

  @ManyToMany(() => MetaDeta, (meta: MetaDeta) => meta.news)
  @JoinTable({
    name: "news_metadata",
    joinColumn: { name: "news", referencedColumnName: "id" },
    inverseJoinColumn: { name: "meta_data", referencedColumnName: "id" },
  })
  metaDatas: MetaDeta[];

  @ManyToMany(() => Tag, (tag: Tag) => tag.news)
  @JoinTable({
    name: "news_tags",
    joinColumn: { name: "news", referencedColumnName: "id" },
    inverseJoinColumn: { name: "tag", referencedColumnName: "id" },
  })
  tags: Tag[];

  @Column({ type: "text" })
  content: string;

  @ManyToMany(() => ImageGallery, (img: ImageGallery) => img.news)
  @JoinTable({
    name: "news_images",
    joinColumn: { name: "news", referencedColumnName: "id" },
    inverseJoinColumn: { name: "image", referencedColumnName: "id" },
  })
  images: ImageGallery[];

  @ManyToMany(() => Brand, (brand: Brand) => brand.news)
  @JoinTable({
    name: "news_brands",
    joinColumn: { name: "news", referencedColumnName: "id" },
    inverseJoinColumn: { name: "brand", referencedColumnName: "id" },
  })
  brand: Brand;

  @ManyToOne(() => Category, (cat: Category) => cat.id)
  @JoinColumn({ name: "category", referencedColumnName: "id" })
  category: Category;

  @CreateDateColumn()
  crateDate: Date;

  @Column({ name: "update_date", type: "datetime" })
  updateDate: Date;
}
