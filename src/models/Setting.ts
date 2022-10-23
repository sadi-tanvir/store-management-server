import { model, Schema } from "mongoose";

export interface SettingSchemaType {
    role: string;
    accountStatus: string;
    darkMode: boolean;
}



const settingSchema = new Schema<SettingSchemaType>({
    role: {
        type: String,
        enum: ["user", "moderator", "admin"],
        default: "user"
    },
    accountStatus: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    darkMode: {
        type: Boolean,
        default: true
    }
});

export default model<SettingSchemaType>('Setting', settingSchema)