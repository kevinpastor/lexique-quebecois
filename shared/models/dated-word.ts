import { Word } from "./word";

export interface DatedWord extends Word {
    timestamp: number;
}
