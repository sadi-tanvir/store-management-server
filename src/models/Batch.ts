import { Schema, model } from "mongoose";



export interface BatchType extends Document {
    userId: any;
    batchNo: string;
    description: string;
    previousAmount: number;
    status: string;
};

const batchSchema = new Schema<BatchType>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    batchNo: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    previousAmount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open"
    }
}, { timestamps: true });




export default model<BatchType>("Batch", batchSchema);