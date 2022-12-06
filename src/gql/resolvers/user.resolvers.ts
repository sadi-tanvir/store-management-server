// import dotenv from "dotenv"
// dotenv.config()
import User from "../../models/User";
import { ContextTypes, UserType, UserUpdateType } from "../../types/resolvers.types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { checkAdminService, createUserService, isUserExistService, updateUserByAdminService } from "../services/user.services";



const userResolver = {
    Query: {
        users: async (_: any, args: any, context: ContextTypes) => {
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to view this page");

            const users = await User.find();
            return users;
        },
        userById: async (_: any, args: { id: string }, context: ContextTypes) => {
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to view this page");

            const user = await User.findOne({ _id: args.id });
            return user;
        },

        darkMode: async (_: any, args: any, context: ContextTypes) => {
            const user = await User.findOne({ email: context.email });
            if (!user) throw new Error("User not found");

            if (user.darkMode === true) {
                user.darkMode = false;
                await user.save();
            } else {
                user.darkMode = true;
                await user.save();
            }

            return user.darkMode;
        }, ownerProfile: async (_: any, args: any, context: ContextTypes) => {
            // checking user existence
            const owner = await User.findOne({ email: context.email });
            if (!owner) throw new Error("The User doesn't exist");

            return {
                status: true,
                owner
            };
        },
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
            const token = jwt.sign({ email: user.email, role: user.role }, process.env.SECRET_KEY)
            if (!token) throw new Error("Failed to create token");

            return {
                status: true,
                message: 'User Logged In Successfully',
                user: user,
                token
            }
        },
        updateUserByAdmin: async (_: any, { userData }: { userData: UserUpdateType }, context: ContextTypes) => {
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to update any user");

            // checking user existence
            const user = await updateUserByAdminService(userData)

            if (!user) throw new Error("Failed to update a user");

            return {
                status: true,
                message: 'The User has been updated Successfully'
            }
        },
        deleteUserById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to delete any user");

            const isDelete = await User.findOneAndDelete({ _id: id });
            if (!isDelete) throw new Error("Failed to delete user");

            return {
                status: true,
                message: "The User has been deleted successfully"
            };
        },
        updateOwnerProfile: async (_: any, { userData }: { userData: UserUpdateType }, context: ContextTypes) => {
            // update user
            const user = await updateUserByAdminService(userData)
            if (!user) throw new Error("Failed to update the user");

            return {
                status: true,
                message: 'The User has been updated Successfully'
            }
        },
        changeUserPassword: async (_: any, { id, data }: { id: string; data: { oldPassword: string; newPassword: string; } }, context: ContextTypes) => {
            const user = await User.findOne({ _id: id });
            if (!user) throw new Error("User not found");

            const isPasswordMatch = bcrypt.compareSync(data.oldPassword, user.password);
            if (!isPasswordMatch) throw new Error("The Password doesn't match");

            // update password
            var salt = bcrypt.genSaltSync(10);
            var hashedPassword = bcrypt.hashSync(data.newPassword, salt);
            const updatePassword = await User.findOneAndUpdate(
                { _id: user._id },
                { $set: { password: hashedPassword } },
                { new: true, runValidators: true }
            );
            if (!updatePassword) throw new Error("Failed to update the password");

            return {
                status: true,
                message: 'The Password has been updated Successfully'
            }
        },
    }
};

export default userResolver;