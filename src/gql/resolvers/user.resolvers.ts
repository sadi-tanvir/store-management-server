import dotenv from "dotenv"
dotenv.config()
import User from "../../models/User";
import { ContextTypes, UserType } from "../../types/resolvers.types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { checkAdminService, createUserService, isUserExistService } from "../services/user.services";



const usersResolver = {
    Query: {
        users: async (_: any, args: any, context: ContextTypes) => {
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to view this page");

            const users = await User.find();
            return users;
        }
    },

    Mutation: {
        signUpUser: async (_: any, { userData }: UserType) => {
            // checking user existence
            const isUserExist = await isUserExistService({ email: userData.email });
            if (isUserExist) throw new Error("The User already exists");

            // create user
            const user = await createUserService(userData)
            if (!user) throw new Error("Failed to Create User.")

            return {
                status: true,
                message: 'The user has created successfully',
                user: user
            }
        },
        signInUser: async (_: any, { userData }: UserType) => {
            const { password } = userData;

            // checking user existence
            const user = await isUserExistService({ email: userData.email });
            if (!user) throw new Error("The User doesn't exist");

            // checking password
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) throw new Error("Email or Password is incorrect");

            // generate jwt token
            const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY)

            return {
                status: true,
                message: 'User Logged In Successfully',
                user: user,
                token
            }
        }
    }
};

export default usersResolver;