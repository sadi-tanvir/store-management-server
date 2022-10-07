import dotenv from "dotenv"
dotenv.config()
import { ContextTypes, ProductType } from "../../types/resolvers.types";
import { checkAdminService } from "../services/user.services";
import { createProductService, getProductByIdService, getProductsService } from "../services/product.services";



const brandResolver = {
    Query: {
        products: async (_: any, args: any, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            // find all products
            const products = await getProductsService()
            return products;
        },
        productById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            // get product by id
            const product = await getProductByIdService(id)

            return product;
        }
    },

    Mutation: {
        createProduct: async (_: any, { data }: ProductType, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            // create product
            const product = await createProductService(data)
            if (!product) throw new Error("Failed to Create a Product.")

            return {
                status: true,
                message: 'The Product has created successfully',
                product: product
            }
        }
    }
};

export default brandResolver;