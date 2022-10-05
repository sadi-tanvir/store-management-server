import { model, Schema } from "mongoose";
import validator from "validator";
import { UserSchemaType } from "../types/models.type";



const userSchema = new Schema<UserSchemaType>({
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        validate: [validator.isEmail, "Please add a valid email"],
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        validate: [validator.isMobilePhone, "Please add a valid phone number"],
    },
    image: {
        type: String,
        default: "empty-avatar.png"
    },
    role: {
        type: String,
        enum: ["user", "moderator", "admin"],
        default: "user"
    },
    accountStatus: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    }
}, { timestamps: true });

export default model<UserSchemaType>('User', userSchema)