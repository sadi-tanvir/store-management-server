import { Schema, model } from "mongoose";
import validator from "validator"


export interface ProductType extends Document {
    name: string;
    description: string;
    unit: string;
    imageUrl: string;
    category: { id: string; name: string; };
    brand: { id: string; name: string; };
}

const productSchema = new Schema<ProductType>({
    name: {
        type: String,
        required: [true, "Name is required"],
        lowercase: true,
        trim: true,
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

    imageUrl: {
        type: String
    },

    category: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
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