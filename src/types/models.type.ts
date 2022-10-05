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