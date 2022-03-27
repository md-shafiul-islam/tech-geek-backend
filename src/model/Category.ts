import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
} from "typeorm";
import { News } from "./News";
import { Post } from "./Post";
import { Product } from "./Product";

@Entity({ name: "category" })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: "text",
  })
  description: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  @JoinColumn({ name: "parent_id" })
  parent: Category;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => Post, (post: Post) => post.category)
  posts: Post[];

  @OneToMany(() => News, (news: News) => news.category)
  news: News[];
}
