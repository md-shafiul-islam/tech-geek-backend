import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { RatingItem } from "./RatingItem";
import { User } from "./User";

@Entity("rating")
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "public_id", unique: true, length:60 })
  @Generated("uuid")
  publicId: string;

  @ManyToOne(() => User, (user: User) => user.id, { nullable: true })
  @JoinColumn({ name: "author" })
  author: User;

  @ManyToOne(() => Product, (product: Product) => product.ratings)
  @JoinColumn({ name: "product" })
  product: Product;

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn({ name: "approve_user" })
  approveUser: User;

  @Column({ name: "tag_line", nullable:true })
  tagLine: string;

  @Column({ name: "total_rating" })
  totalRating: number;

  @Column({ name: "rate_max_score" })
  rateMaxScore: number;

  @Column({ name: "rate_min_score" })
  rateMinScore: number;

  @Column({ name: "rate_avr_score" })
  rateAvrScore: number;

  @Column({ name: "rate_items_count" })
  rateItemsCount: number;

  @OneToMany(() => RatingItem, (ratingItem: RatingItem) => ratingItem.rating)
  ratingItems: RatingItem[];
}
