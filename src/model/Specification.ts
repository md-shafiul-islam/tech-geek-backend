import { randomUUID } from "crypto";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { SpecificationType } from "./SpecificationType";
import { SpecKey } from "./SpecKey";

@Entity({ name: "specification" })
export class Specification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SpecificationType, (spcType: SpecificationType) => spcType.id)
  @JoinColumn({name:"spec_type"})
  specType: SpecificationType;

  @ManyToOne(() => SpecKey, (specKey: SpecKey) => specKey.id)
  @JoinColumn({ name: "spec_key" })
  key: SpecKey;

  @Column()
  value: string;

  @Column()
  description: string;

  @ManyToOne(() => Product, (product: Product) => product.specifications)
  @JoinColumn({ name: "product" })
  product: Product;

  @Column({name:"is_key_feature", default:false})
  isFeature:boolean;
}
