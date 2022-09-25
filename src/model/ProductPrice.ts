import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Product } from "./Product";

@Entity({ name: "product_price" })
export class ProductPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title:string;

  @Column()
  type:string;

  @Column({ name: "price", type: "double", default:0 })
  price: number;

  @Column({ type: "double", name: "discount_price", default:0 })
  discountPrice: number;

  @Column({ name: "discount_status", default:false })
  isDiscounted: boolean;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: "product" })
  product: Product;
}
