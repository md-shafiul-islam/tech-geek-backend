import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { News } from "./News";
import { Post } from "./Post";
import { Product } from "./Product";


@Entity({name:"meta_data"})
export class MetaDeta{

    @PrimaryGeneratedColumn()
    id:number

    @Column({length:75})
    name:string

    @Column({type:"text"})
    content:string

    @ManyToMany(()=>Product)
    products:Product[]

    @ManyToMany(()=>Post)
    posts:Post[]

    @ManyToMany(()=>News)
    news:News[]


}