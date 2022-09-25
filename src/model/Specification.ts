import { randomUUID } from "crypto";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { SpecKey } from "./SpecKey";

@Entity({ name: "specification" })
export class Specification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SpecKey, (specKey: SpecKey) => specKey.id)
  @JoinColumn({ name: "spc_key" })
  key: SpecKey;

  @Column({name:"value", type:"mediumtext"})
  value: string;

  @Column({name:"description", type:"mediumtext"})
  description: string;

  @ManyToOne(() => Product, (product: Product) => product.specifications)
  @JoinColumn({ name: "product" })
  product: Product;

  @Column({name:"is_key_feature", default:false})
  isFeature:boolean;
}
