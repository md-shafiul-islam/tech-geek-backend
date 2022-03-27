import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { News } from "./News";
import { Product } from "./Product";

@Entity({ name: "brand" })
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 155 })
  name: string;

  @Column("text")
  description: string;

  @Column({ length: 175 })
  tagLine: string;

  @Column({ name: "logo_url", length: 205 })
  logoUrl: string;

  @Column({ name: "web_url", length: 105 })
  website: string;

  @OneToMany(() => Product, (product: Product) => product.brand)
  products: Product[];

  @ManyToMany(() => News, (news: News) => news.brand)
  news: News[];
}
