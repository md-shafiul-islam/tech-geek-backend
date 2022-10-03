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

  @Column({name:"public_id", unique:true, length:60})
  publicId:string;

  @Column({ length: 155, nullable:true})
  name: string;

  @Column({type:"text", nullable:true})
  description: string;

  @Column({name:"tag_line", length: 175, nullable:true })
  tagLine: string;

  @Column({ name: "logo_url", length: 205, nullable:true })
  logoUrl: string;

  @Column({ name: "web_url", length: 105, nullable:true })
  website: string;

  @OneToMany(() => Product, (product: Product) => product.brand)
  products: Product[];

  @ManyToMany(() => News, (news: News) => news.brand)
  news: News[];
}
