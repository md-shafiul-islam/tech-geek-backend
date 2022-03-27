import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { News } from "./News";
import { Post } from "./Post";
import { Product } from "./Product";

@Entity("image_gallery")
export class ImageGallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 155 })
  name: string;

  @Column({ name: "alt_tag", length: 105 })
  altTag: string;

  @Column({ length: 105 })
  title: string;

  @Column({ length: 205 })
  location: string;

  @ManyToOne(() => Product, (product: Product) => product.images)
  @JoinColumn({name:"product"})
  product: Product;

  @ManyToMany(() => Post)
  posts: Post[];

  @ManyToMany(() => News)
  news: News;
}
