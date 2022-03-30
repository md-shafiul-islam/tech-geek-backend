import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @Column({ name: "public_id", unique: true })
  @Generated("uuid")
  publicId: string;

  @Column({ name: "ally_name", unique: true })
  allyName: string;

  @Column({ length: 150 })
  title: string;

  @Column("text")
  content: string;

  @ManyToOne(() => User, (user: User) => user.id, { nullable: true })
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
    joinColumn: { name: "post", referencedColumnName: "id" },
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

  @UpdateDateColumn({ name: "update_date" })
  updateDate: Date;

  addAllImage(imgs: ImageGallery[]) {
    if (!Array.isArray(this.images)) {
      this.images = new Array<ImageGallery>();
    }
    this.images.push.apply(this.images, imgs);
  }

  addImage(image: ImageGallery) {
    if (!Array.isArray(this.images)) {
      this.images = new Array<ImageGallery>();
    }
    this.images.push(image);
  }

  addAllTag(tgs: Tag[]) {
    if (!Array.isArray(this.tags)) {
      this.tags = new Array<Tag>();
    }
    this.tags.push.apply(this.tags, tgs);
  }

  addTag(tag: Tag) {
    if (!Array.isArray(this.tags)) {
      this.tags = new Array<Tag>();
    }
    this.tags.push(tag);
  }

  addAllMetaData(metas: MetaDeta[]) {
    if (!Array.isArray(this.metaDatas)) {
      this.metaDatas = new Array<MetaDeta>();
    }
    this.metaDatas.push.apply(this.metaDatas, metas);
  }

  addMeta(metaData: MetaDeta) {
    if (!Array.isArray(this.metaDatas)) {
      this.metaDatas = new Array<MetaDeta>();
    }
    this.metaDatas.push(metaData);
  }
}
