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

@Entity({ name: "post" })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:"public_id"})
  publicId:string;

  @Column({ length: 150 })
  title: string;

  @Column("text")
  content: string;

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn({ name: "approve_user" })
  user: User;

  @ManyToMany(() => ImageGallery, (image: ImageGallery) => image.posts)
  @JoinTable({
    name: "posts_images",
    joinColumn: { name: "post", referencedColumnName: "id" },
    inverseJoinColumn: { name: "image", referencedColumnName: "id" },
  })
  images: ImageGallery[];

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn({ name: "author" })
  author: User;

  @ManyToMany(() => Tag, (tag: Tag) => tag.posts)
  @JoinTable({
    name: "posts_tags",
    joinColumn: { name: "post" },
    inverseJoinColumn: { name: "tag", referencedColumnName: "id" },
  })
  tags: Tag[];

  @ManyToMany(() => MetaDeta, (meta: MetaDeta) => meta.posts)
  @JoinTable({
    name: "posts_metadats",
    joinColumn: { name: "post", referencedColumnName: "id" },
    inverseJoinColumn: { name: "meta_data", referencedColumnName: "id" },
  })
  metaDatas: MetaDeta[];

  @ManyToOne(() => Brand, (brand: Brand) => brand.id)
  @JoinColumn({ name: "brand" })
  brand: Brand;

  @ManyToOne(() => Category, (cat: Category) => cat.id)
  @JoinColumn({ name: "category" })
  category: Category;

  @CreateDateColumn()
  createdDate: Date;

  @Column({ name: "update_date" })
  updateDate: Date;
}
