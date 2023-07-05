import { ObjectId } from "mongodb";

export default interface Entry {
    _id?: ObjectId;
    fdcId?: number;
    proteinAmount: number;
    proteinType: string;
    veggiesAmount: number;
    veggiesType: string;
    fatsAmount: number;
    fatsType: string;
    carbsAmount: number;
    carbsType: string;
    date: number | any;
}