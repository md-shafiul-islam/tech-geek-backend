import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "track_product_visit" })
export class TrackProductVisit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ name: "product" })
  pId: number;

  @Column({ name: "visits" })
  visits: number;
}
