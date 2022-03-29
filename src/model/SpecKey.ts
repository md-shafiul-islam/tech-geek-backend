import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Specification } from "./Specification";

@Entity({ name: "spec_key" })
export class SpecKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 105, unique: true })
  name: string;

  @Column({ length: 155, default: "" })
  value: string;

  @OneToMany(() => Specification, (spc: Specification) => spc.key)
  specifications: Specification[];
}
