import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SpecKey } from "./SpecKey";

@Entity({ name: "specification_type" })
export class SpecificationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 105, default:'' })
  name: string;

  @Column({ length: 105,  unique: true })
  value: string;

  @OneToMany(() => SpecKey, (spc:SpecKey)=>spc.specType)
  specKeys: SpecKey[];
}
