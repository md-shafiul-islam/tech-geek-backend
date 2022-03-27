import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity("review")
export class Review {
    
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>User, (user:User)=>user.id)
    @JoinColumn({name:"author"})
    author:User

    @ManyToOne(()=>Product, (product:Product)=>product.reviews)
    @JoinColumn({name:"product"})
    product:Product

    @ManyToOne(()=>User, (user:User)=>user.id)
    @JoinColumn({name:"approve_user"})
    approveUser:User

    @Column("text")
    content:string

    @CreateDateColumn({name:"created_date"})
    createdDate:Date;

    @Column({name:"update_date"})
    updateDate:Date;
};
