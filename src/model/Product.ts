import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Brand } from "./Brand";
import { Category } from "./Category";
import { ImageGallery } from "./ImageGallery";
import { MetaDeta } from "./MetaData";
import { ProductPrice } from "./ProductPrice";
import { Rating } from "./Rating";
import { Review } from "./Review";
import { Specification } from "./Specification";
import { User } from "./User";

@Entity({ name: "product" })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "public_id", unique: true, length: 75 })
  @Generated("uuid")
  publicId: string;

  @Column({ name: "alias_name" })
  aliasName: string;

  @Column({
    length: 175,
  })
  title: string;

  @Column()
  model: string;

  @Column({ type: "double" })
  quantity: number;

  @Column({ length: 100 })
  ram: string;

  @Column({ name: "image_url", length: 205 })
  imageUrl: string;

  @OneToMany(
    () => ProductPrice,
    (productPrice: ProductPrice) => productPrice.product
  )
  prices: ProductPrice[];

  @Column({ default: 0 })
  price: number;

  @Column({ name: "discount_price", default: 0 })
  discountPrice: number;

  @Column({ name: "discount_status" })
  discountStatus: boolean;

  @Column({ name: "is_upcoming" })
  isUpcoming: boolean;

  @Column({ type: "longtext", default: null, nullable: true })
  description: string;

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn({ name: "user" })
  user: User;

  @ManyToOne(() => Category, (category: Category) => category.id)
  @JoinColumn({ name: "category" })
  category: Category;

  @ManyToMany(() => ImageGallery, (image: ImageGallery) => image.products, {
    cascade: true,
  })
  @JoinTable({
    name: "product_images",
    joinColumn: { name: "product", referencedColumnName: "id" },
    inverseJoinColumn: { name: "image", referencedColumnName: "id" },
  })
  images: ImageGallery[];

  @ManyToMany(() => MetaDeta, (metadata: MetaDeta) => metadata.products, {
    cascade: true,
  })
  @JoinTable({
    name: "product_meta",
    joinColumn: { name: "product", referencedColumnName: "id" },
    inverseJoinColumn: { name: "meta", referencedColumnName: "id" },
  })
  metaDatas: MetaDeta[];

  @Column({ name: "brand" })
  brand: string;

  @OneToMany(() => Specification, (spec: Specification) => spec.product)
  specifications: Specification[];

  @OneToMany(() => Review, (review: Review) => review.product)
  reviews: Review[];

  @OneToMany(() => Rating, (rating: Rating) => rating.product)
  ratings: Rating[];

  @OneToOne(() => Rating, (rating: Rating) => rating.avgRatProduct)
  avgRating: Rating;

  @CreateDateColumn({ name: "create_date" })
  createDate: Date;

  @UpdateDateColumn({ name: "update_date" })
  updateDate: Date;

  addMetaData(meta: MetaDeta) {
    if (!Array.isArray(this.metaDatas)) {
      this.metaDatas = new Array<MetaDeta>();
    }
    this.metaDatas.push(meta);
  }

  addAllMetaData(metas: MetaDeta[]) {
    if (!Array.isArray(this.metaDatas)) {
      this.metaDatas = new Array<MetaDeta>();
    }
    this.metaDatas.push.apply(this.metaDatas, metas);
  }

  addImage(image: ImageGallery) {
    if (!Array.isArray(this.images)) {
      this.images = new Array<ImageGallery>();
    }

    this.images.push(image);
  }

  addAllSpecification(specs: Specification[]) {
    if (!Array.isArray(this.specifications)) {
      this.specifications = new Array<Specification>();
    }

    this.specifications.push.apply(this.specifications, specs);
  }

  addSpecification(spec: Specification) {
    if (!Array.isArray(this.specifications)) {
      this.specifications = new Array<Specification>();
    }

    this.specifications.push(spec);
  }

  addAllImage(imgs: ImageGallery[]) {
    if (!Array.isArray(this.images)) {
      this.images = new Array<ImageGallery>();
    }

    this.images.push.apply(this.images, imgs);
  }
}
