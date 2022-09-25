import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Specification } from "./Specification";
import { SpecificationType } from "./SpecificationType";

@Entity({ name: "spec_key" })
export class SpecKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100})
  name: string;

  @Column({ length: 105, unique: true })
  value: string;

  @Column()
  type:number;

  @ManyToOne(() => SpecificationType, (spcType: SpecificationType) => spcType.id)
  @JoinColumn({name:"spec_type"})
  specType: SpecificationType;

  @OneToMany(() => Specification, (spc: Specification) => spc.key)
  specifications: Specification[];
}
