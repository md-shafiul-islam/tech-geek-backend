import { Specification } from "./Specification";
import { SpecificationType } from "./SpecificationType";
export declare class SpecKey {
    id: number;
    name: string;
    value: string;
    type: number;
    specType: SpecificationType;
    specifications: Specification[];
}
