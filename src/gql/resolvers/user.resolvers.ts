import User from "../../models/User";
import { HydratedDocument } from 'mongoose';
import { UserSignUpType } from "../../types/resolvers.types";
import bcrypt from "bcryptjs";
import { UserSchemaType } from "../../types/models.type";


const usersResolver = {
    Query: {

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

            return user
        }
    }
};

export default usersResolver;