import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { FieldName } from "./FieldName";

@Entity({ name: "input_template" })
export class InputFormTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  name: string;

  url: string;

  fields: FieldName[];
}
