import { Schema, model } from "mongoose"
import validator from "validator"
import { SupplierSchemaType } from "../types/models.types"


const supplierSchema = new Schema<SupplierSchemaType>({
    name: {
        type: String,
        required: [true, "Brand name is required"],
        trim: true,
        maxLength: [100, "your name is too long, please provide your name between 4 to 100 characters"],
        minlength: [4, "your name is too short, please provide your name between 4 to 100 characters"],
        lowercase: true
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    contactNumber: {
        type: String,
        required: [true, "Contact number is required"],
    },
    tradeLicenseNumber: String,
    presentAddress: {
        type: String,
        trim: true,
        lowercase: true
    },
    permanentAddress: {
        type: String,
        trim: true,
        lowercase: true
    },
    imageUrl: String,
    status: {
        type: String,
        enum: ['active', 'inactive', 'discontinued'],
        default: 'active'
    },
    brand: {
        name: {
            type: String,
            trim: true,
            required: true
        },
        id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Brand'
        }
    },
}, { timestamps: true })



export default model<SupplierSchemaType>("Supplier", supplierSchema)