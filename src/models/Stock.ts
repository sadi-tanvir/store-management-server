import { Schema, model } from "mongoose";
import validator from "validator"
import { StockSchemaType } from "../types/models.types";



const stockSchema = new Schema<StockSchemaType>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    name: {
        type: String,
        required: [true, "Please provide a name for this product"],
        lowercase: true,
        trim: true,
        minLength: [3, "Name must be at least 3 characters long"],
    },

    description: {
        type: String
    },

    unit: {
        type: String,
        required: [true, "Unit is required"],
        enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: "unit value can't be {VALUE} only kg, litre or pcs"
        }
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "Status value can't be {VALUE} only in-stock, out-of-stock or discontinued"
        }
    },
    imageUrl: {
        type: String,
        default: 'empty-product.png'
    },

    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],

    },

    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity cannot be negative"],
        validate: {
            validator: (value: number) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        message: "Quantity must be an integer"
    },
    category: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        }
    },
    sellCount: {
        type: Number,
        default: 0,
        min: [0, "Sell count cannot be negative"]
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
    },
    suppliedBy: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a supplier name"],
        },
        id: {
            type: Schema.Types.ObjectId,
            ref: "Supplier",
        }
    }

}, { timestamps: true });

stockSchema.pre('save', function () {
    if (this.quantity <= 0) {
        this.status = "out-of-stock"
    } else {
        this.status = "in-stock"
    }
})



export default model<StockSchemaType>("Stock", stockSchema);
