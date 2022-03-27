import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity("rating")
export class Rating {
    
    @PrimaryGeneratedColumn()
    id:string;

    @ManyToOne(()=>User, (user:User)=>user.id)
    @JoinColumn({name:"author"})
    author:User

    @ManyToOne(()=>Product, (product:Product)=>product.ratings)
    @JoinColumn({name:"product"})
    product:Product

    @ManyToOne(()=>User, (user:User)=>user.id)
    @JoinColumn({name:"approve_user"})
    approveUser:User

};
