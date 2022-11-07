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
        },
        brandsWithReference: async (_: any, args: any, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            const brands = await Brand.find()
                .populate("suppliers.id")
                .populate("products")
            return brands;
        },
        getBrandWithId: async (_: any, args: any, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to get brand");

            const brand = await Brand.findOne({ _id: args.id })
                .populate("suppliers.id")
                .populate("products")
            return brand;
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
        },
        deleteBrandById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to delete a brand");

            const brand = await Brand.findByIdAndDelete(id)
            if (!brand) throw new Error("Failed to Delete a Brand.")

            return {
                status: true,
                message: 'The brand has been deleted successfully',
            }
        },
        updateBrandById: async (_: any, args: any, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to update brand");

            const brand = await Brand.findOneAndUpdate({ _id: args.id }, args.data)
            if (!brand) throw new Error("Failed to Update the Brand.")

            return {
                status: true,
                message: 'The brand has been updated successfully'
            };
        }
    }
};

export default brandResolver;