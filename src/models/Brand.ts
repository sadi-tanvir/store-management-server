import { Schema, model, Document } from "mongoose"
import validator from "validator"
import { BrandSchemaType } from "../types/models.type"


const brandSchema = new Schema<BrandSchemaType>({
    name: {
        type: String,
        required: [true, "Brand name is required"],
        trim: true,
        maxLength: [200, "Brand name cannot be more than 100 characters"],
        unique: true,
        lowercase: true
    },
    description: String,
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        lowercase: true
    },
    phone: String,
    website: {
        type: String,
        validate: [validator.isURL, "Please enter a valid URL"]
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    location: String,
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    suppliers: [{
        name: String,
        email: String,
        phone: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: "Supplier"
        }
    }]
}, { timestamps: true })



export default model<BrandSchemaType>("Brand", brandSchema)