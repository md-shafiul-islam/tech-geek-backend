import { UpdateResult } from "typeorm";
import { User } from "../model/User";
declare class UserService {
    private userRepository;
    private initRepository;
    save(user: Partial<User>): Promise<(Partial<User> & User) | null | undefined>;
    getById(id: number): Promise<User | null | undefined>;
    getAll(): Promise<User[] | null | undefined>;
    update(user: Partial<User>): Promise<UpdateResult | null | undefined>;
    delete(id: number): Promise<import("typeorm").DeleteResult | null | undefined>;
}
export declare const userService: UserService;
export {};
