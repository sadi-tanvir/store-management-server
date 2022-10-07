import dotenv from "dotenv"
dotenv.config()
import Product from "../../models/Product";
import { ContextTypes } from "../../types/resolvers.types";
import { checkAdminService } from "../services/user.services";
import { ObjectId } from "mongodb"

export type ProductType = {
    data: {
        name: string;
        description: string;
        unit: string;
        imageUrl: string[];
        category: {
            id: string;
            name: string;
        }
        brand: {
            id: string;
            name: string;
        }
    }
}


const brandResolver = {
    Query: {
        products: async (_: any, args: any, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            const products = await Product.find()
                .populate('category.id')
                .populate('brand.id');
            return products;
        },
        productById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            const product = await Product.findOne({ _id: new ObjectId(id) })
                .populate('category.id')
                .populate('brand.id');
            console.log(product);

            return product;
        }
    },

    Mutation: {
        createProduct: async (_: any, { data }: ProductType, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            // create brand
            const product = await Product.create({
                name: data.name,
                description: data.description,
                unit: data.unit,
                imageUrl: data.imageUrl,
                category: {
                    id: new ObjectId(data.category.id),
                    name: data.category.name
                },
                brand: {
                    id: new ObjectId(data.brand.id),
                    name: data.brand.name
                }
            })
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