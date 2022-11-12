import Brand from "../../models/Brand";
import Order from "../../models/Order";
import { BrandType, ContextTypes, UserType } from "../../types/resolvers.types";
import { checkAdminService, createUserService, isUserExistService } from "../services/user.services";


export type OrderType = {
    userId: string;
    email: string;
    phone: string
    address: string;
    amount: number;
    products: {
        stockId: string;
        qty: number;
        price: number;
        name: string;
        imageUrl: string;
        category: string;
        brand: string;
    }
}

const orderResolver = {
    Query: {
        orders: async (_: any, args: any, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to get orders");

            const orders = await Order.find()
                .populate("userId")
                .populate("products.stockId")
            return orders;
        }
    },


    Mutation: {
        createOrder: async (_: any, { data }: { data: OrderType }, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            // create order
            const order = await Order.create({
                userId: data.userId,
                products: data.products,
                email: data.email,
                phone: data.phone,
                address: data.address,
                amount: data.amount
            })
            if (!order) throw new Error("Failed to Create a Order.")

            return {
                status: true,
                message: 'The order has created successfully',
                order: order
            }
        },
        deleteBrandById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to delete a order");

            const order = await Brand.findByIdAndDelete(id)
            if (!order) throw new Error("Failed to Delete a Order.")

            return {
                status: true,
                message: 'The order has been deleted successfully',
            }
        },
    }
};

export default orderResolver;