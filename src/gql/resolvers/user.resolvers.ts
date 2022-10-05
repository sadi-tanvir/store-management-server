import User from "../../models/User";
import { HydratedDocument } from 'mongoose';
import { UserSignUpType } from "../../types/resolvers.types";
import bcrypt from "bcryptjs";
import { UserSchemaType } from "../../types/models.type";
import jwt from "jsonwebtoken";


const usersResolver = {
    Query: {
        users: async (_: any, args: any, context: { email: string }) => {
            const isAdmin = await User.findOne({ email: context.email, role: "admin" });
            if (!isAdmin) throw new Error("You are not authorized to view this page");

            const users = await User.find();
            return users;
        }
    },
    Mutation: {
        signUpUser: async (_: any, { userData }: UserSignUpType) => {
            const { name, email, password, phone } = userData;

            // checking user existence
            const isUserExist = await User.findOne({ email });
            if (isUserExist) throw new Error("The User already exists");

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            const user: HydratedDocument<UserSchemaType> = new User({
                name: name,
                email: email,
                password: hash,
                phone: phone,
            });
            await user.save();

            return {
                status: true,
                message: 'The user has created successfully',
                user: user
            }
        },
        signInUser: async (_: any, { userData }: UserSignUpType) => {
            const { email, password } = userData;

            // checking user existence
            const user = await User.findOne({ email });
            if (!user) throw new Error("The User doesn't exist");

            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) throw new Error("Email or Password is incorrect");

            // generate jwt token
            const token = jwt.sign({ email: user.email }, 'this is secret key')

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