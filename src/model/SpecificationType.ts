import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { string } from "yup";
import { Specification } from "./Specification";

@Entity({ name: "specification_type" })
export class SpecificationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ length: 105, default:"" })
  value: string;

  @OneToMany(() => Specification, (spc:Specification)=>spc.specType)
  specification: Specification[];
}
