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
    category: any;
    status: string;
    sellCount: number;
    brand: any;
    suppliedBy: any;
}

export interface CategorySchemaType extends Document {
    name: string;
    description: string;
}


export interface SupplierSchemaType extends Document {
    name: string;
    email: string;
    contactNumber: string;
    tradeLicenseNumber: string;
    presentAddress: string;
    permanentAddress: string;
    imageUrl: string;
    status: string;
    brand: string;
}

export interface BrandSchemaType extends Document {
    name: string;
    description: string;
    email: string;
    phone: string;
    website: string;
    location: string;
    products: any[];
    suppliers: any[];
    status: string;
}