import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InputFormTemplate } from "./InputFormTemplate";

@Entity({ name: "field_name" })
export class FieldName {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "field_name" })
  fieldName: string;

  title: string;

  @ManyToOne(() => InputFormTemplate, (template: InputFormTemplate) => template.id)
  @JoinColumn({name:"in_temp"})
  inputFormTemplate: InputFormTemplate;
}
