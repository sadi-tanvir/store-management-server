import { Schema, model } from "mongoose";
import validator from "validator"


export interface ProductType extends Document {
    name: string;
    description: string;
    unit: string;
    imageUrl: string[];
    categories: { id: string; name: string; };
    brand: { id: string; name: string; },
}

const productSchema = new Schema<ProductType>({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
        lowercase: true,
        trim: true,
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [50, "Name must be at most 50 characters long"]
    },

    description: {
        type: String,
        required: [true, "Description is required"],
    },

    unit: {
        type: String,
        required: [true, "Unit is required"],
        enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: "unit value can't be {VALUE} only kg, litre or pcs"
        }
    },

    imageUrl: [{
        type: String,
        validate: {
            validator: (value: string[]) => {
                if (!Array.isArray(value)) {
                    return false;
                }

                let isValid = true;
                value.forEach((url: string) => {
                    if (!validator.isURL(url)) {
                        isValid = false
                    }
                })

                return isValid;
            }
        }
    }],

    categories: {
        id: Schema.Types.ObjectId,
        name: {
            type: String,
            required: true,
        }
    },

    brand: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: Schema.Types.ObjectId,
            ref: "Brand"
        }
    }

}, { timestamps: true });




export default model<ProductType>("Product", productSchema);