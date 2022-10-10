import User from "../../models/User";
import bcrypt from "bcryptjs";
import { UserSchemaType } from "../../types/models.types";
import { HydratedDocument } from "mongoose";
import { ContextTypes } from "../../types/resolvers.types";
import { UserServiceType } from "../../types/services.types";

// create user service
export const createUserService = async ({ name, email, password, phone }: UserServiceType) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    const user: HydratedDocument<UserSchemaType> = new User({
        name: name,
        email: email,
        password: hash,
        phone: phone,
    });
    await user.save();

    return user;
}


// check admin service
export const checkAdminService = async ({ email }: ContextTypes) => {
    const admin = await User.findOne({ email: email, role: "admin" });
    return admin;
}


// check user existence service
export const isUserExistService = async ({ email }: { email: string }) => {
    const user = await User.findOne({ email: email });
    return user;
}