import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  MaxKey,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Brand } from "./Brand";
import { Category } from "./Category";
import { ImageGallery } from "./ImageGallery";
import { MetaDeta } from "./MetaData";
import { Rating } from "./Rating";
import { Review } from "./Review";
import { Specification } from "./Specification";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity({ name: "product" })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 155,
  })
  title: string;

  @Column()
  model: string;

  @Column({ type: "double" })
  quantity: number;

  @Column("double")
  price: number;

  @Column({ type: "double", name: "discount_price" })
  discountPrice: number;

  @Column({ name: "discount_status" })
  discountStatus: boolean;

  @Column("text")
  description: string;

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn({ name: "user" })
  user: User;

  @ManyToOne(() => Category, (category: Category) => category.id)
  @JoinColumn({ name: "category" })
  category: Category;

  @OneToMany(
    () => ImageGallery,
    (imageGallery: ImageGallery) => imageGallery.product
  )
  images: ImageGallery[];

  @ManyToMany(() => Tag, (tag: Tag) => tag.products)
  tags: Tag[];

  @ManyToMany(() => MetaDeta, (metadata: MetaDeta) => metadata.products)
  metaDatas: MetaDeta[];

  @ManyToOne(() => Brand, (brand: Brand) => brand.products)
  @JoinColumn({ name: "brand" })
  brand: Brand;

  @OneToMany(() => Specification, (spec: Specification) => spec.product)
  specifications: Specification[];

  @OneToMany(() => Review, (review: Review) => review.product)
  reviews: Review[];

  @OneToMany(()=>Rating, (rating:Rating)=>rating.product)
  ratings:Rating[]
}
