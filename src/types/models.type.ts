import { Document } from "mongoose";

export interface UserSchemaType extends Document {
    name: string;
    email: string;
    password: string;
    image: string;
    phone: string;
    role: string;
    accountStatus: string;
}


export interface StockSchemaType extends Document {
    productId: any;
    name: string;
    description: string;
    unit: string;
    imageUrl: string[];
    price: number;
    quantity: number;
    categories: string;
    brand: any;
    status: string;
    suppliedBy: any;
    sellCount: number;
}