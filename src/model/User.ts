import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { News } from "./News";
import { Post } from "./Post";
import { Product } from "./Product";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:"first_name"})
  firstName: string;

  @Column({name:"last_name"})
  lastName: string;

  @OneToMany(() => Product, (product: Product) => product.user)
  products: Product[];

  @OneToMany(() => Post, (post: Post) => post.user)
  posts: Post[];

  @OneToMany(() => News, (news: News) => news.user)
  news: News[];

  @Column({ name: "is_active" })
  isActive: boolean;
}
