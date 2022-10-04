import User, { IUser } from "../../models/User";
import { HydratedDocument } from 'mongoose';
import { UserSignUpType, UserSignInType } from "../../types/types.resolvers";
import bcrypt from "bcryptjs";


const usersResolver = {
    Query: {
        users: async () => {
            const users = await User.find({});
            return users
        }
    },
    Mutation: {
        signUpUser: async (_: any, { userData }: UserSignUpType) => {
            const { name, email, password } = userData;

            // checking user existence
            const isUserExist = await User.findOne({ email: email });
            if (isUserExist) throw new Error("User already exists");

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            const user: HydratedDocument<IUser> = new User({
                name: name,
                email: email,
                password: hash
            });
            await user.save();
            return user
        },
        signInUser: async (_: any, { userData }: UserSignInType) => {
            const { email, password } = userData;
            // checking user existence
            const user = await User.findOne({ email: email });
            if (!user) throw new Error("User Don't Exist. Please Sign Up!");

            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) throw new Error("Incorrect Password");

            return user
        }
    }
};

export default usersResolver;