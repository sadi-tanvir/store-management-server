// import dotenv from "dotenv"
// dotenv.config()
import Category from "../../models/Category";
import { CategoryType, ContextTypes } from "../../types/resolvers.types";
import { checkAdminService } from "../services/user.services";




const categoryResolver = {
    Query: {
        categories: async (_: any, args: any, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            const categories = await Category.find();
            return categories;
        }
    },

    Mutation: {
        createCategory: async (_: any, { data }: CategoryType, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add category");

            // create brand
            const category = await Category.create({
                name: data.name,
                description: data.description
            })
            if (!category) throw new Error("Failed to Create a Category.")

            return {
                status: true,
                message: 'The category has created successfully',
                category: category
            }
        },
        deleteCategoryById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to delete a category");

            const category = await Category.findByIdAndDelete(id)
            if (!category) throw new Error("Failed to Delete a Category.")

            return {
                status: true,
                message: 'The category has been deleted successfully',
            }
        },
        updateCategoryById: async (_: any, args: any, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to update category");

            const category = await Category.findOneAndUpdate({ _id: args.id }, args.data)
            if (!category) throw new Error("Failed to Update the Category.")

            return {
                status: true,
                message: 'The category has been updated successfully'
            };
        }
    }
};

export default categoryResolver;