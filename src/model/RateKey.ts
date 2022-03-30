import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"rate_key"})
export class RateKey{

    @PrimaryGeneratedColumn()
    id:number;

    name:string;

    value:string;
}