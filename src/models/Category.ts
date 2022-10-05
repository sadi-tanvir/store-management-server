import { Schema, model } from "mongoose"
import { CategorySchemaType } from "../types/models.type"



const categorySchema = new Schema<CategorySchemaType>({
    name: {
        type: String,
        required: [true, "Brand name is required"],
        trim: true,
        maxLength: [50, "Please provide a category name"],
        unique: true,
        lowercase: true
    },
    description: String
}, { timestamps: true })



export default model<CategorySchemaType>("Category", categorySchema)