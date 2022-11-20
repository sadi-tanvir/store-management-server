import { Schema, model } from "mongoose";




export interface OrderType extends Document {
    batchRef: any;
    userId: any;
    products: any;
    email: string;
    phone: string;
    address: string;
    amount: number;
    paymentStatus: string;
    trxId: string;
    orderStatus: string;
};

const productSchema = new Schema<OrderType>({
    batchRef: {
        type: Schema.Types.ObjectId,
        ref: 'Batch',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    products: [{
        stockId: {
            type: Schema.Types.ObjectId,
            ref: "Stock",
        },
        qty: Number,
        price: Number,
        name: String,
        imageUrl: String,
        category: String,
        brand: String,
        unit: String,
    }],
    amount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid"
    },
    trxId: {
        type: String,
        default: ""
    },
    orderStatus: {
        type: String,
        enum: ["pending", "processing", "delivered", "cancelled"],
        default: "pending"
    }
}, { timestamps: true });




export default model<OrderType>("Order", productSchema);