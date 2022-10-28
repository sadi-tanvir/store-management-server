// import dotenv from "dotenv"
// dotenv.config()
import Brand from "../../models/Brand";
import { BrandType, ContextTypes, UserType } from "../../types/resolvers.types";
import { checkAdminService, createUserService, isUserExistService } from "../services/user.services";




const brandResolver = {
    Query: {
        brands: async (_: any, args: any, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            const brands = await Brand.find();
            return brands;
        }
    },

    Mutation: {
        createBrand: async (_: any, { data }: BrandType, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            // create brand
            const brand = await Brand.create({
                name: data.name,
                description: data.description,
                email: data.email,
                phone: data.phone,
                website: data.website,
                location: data.location,
                products: data.products,
                suppliers: data.suppliers
            })
            if (!brand) throw new Error("Failed to Create a Brand.")

            return {
                status: true,
                message: 'The brand has created successfully',
                brand: brand
            }
        }
    }
};

export default brandResolver;