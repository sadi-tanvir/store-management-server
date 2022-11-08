import { ContextTypes, ProductType } from "../../types/resolvers.types";
import { checkAdminService } from "../services/user.services";
import { createProductService, getProductByIdService, getProductsService } from "../services/product.services";
import Product from "../../models/Product";



const productResolver = {
    Query: {
        products: async (_: any, args: any, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            // find all products
            const products = await Product.find()
                .populate('category.id')
                .populate('brand.id');
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
        },
        updateProductById: async (_: any, args: any, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to update product");

            const product = await Product.findOneAndUpdate({ _id: args.id }, args.data)
            if (!product) throw new Error("Failed to Update the Product.")

            return {
                status: true,
                message: 'The product has been updated successfully'
            };
        },
        deleteProductById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to delete product");

            const product = await Product.findByIdAndDelete(id)
            if (!product) throw new Error("Failed to Delete a Product.")

            return {
                status: true,
                message: 'The product has been deleted successfully',
            }
        },
    }
};

export default productResolver;