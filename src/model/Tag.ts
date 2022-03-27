import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { News } from "./News";
import { Post } from "./Post";
import { Product } from "./Product";

@Entity({ name: "tag" })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 105 })
  name: string;

  @Column("text")
  value: string;

  @ManyToMany(() => Product, (product: Product) => product.tags)
  products: Product[];

  @ManyToMany(()=>Post, (post:Post)=>post.tags)
  posts:Post[]

  @ManyToMany(()=> News, (news:News)=>news.tags)
  news:News[]
}
