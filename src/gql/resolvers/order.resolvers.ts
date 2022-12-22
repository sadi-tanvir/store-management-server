import Brand from "../../models/Brand";
import Order from "../../models/Order";
import { BrandType, ContextTypes, UserType } from "../../types/resolvers.types";
import { checkAdminService, createUserService, isUserExistService } from "../services/user.services";


export type OrderType = {
    batchRef: string,
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
            if (!isAdmin) throw new Error("You are not authorized to add product");

            const orders = await Order.find()
                .sort({ paymentStatus: -1, orderStatus: -1 })
                .populate("userId")
                .populate("products.stockId")
                .populate("batchRef")
            return orders;
        },
        getOrdersByBatchAndUserId: async (_: any, args: { batchId: string; userId: string; }, context: ContextTypes) => {
            const orders = await Order.find({ batchRef: args.batchId, userId: args.userId })
                .populate("userId")
                .populate("products.stockId")
                .populate("batchRef")
            return orders;
        },
        ownerOrders: async (_: any, args: { userId: string; }) => {
            const orders = await Order.find({ userId: args.userId })
                .populate("userId")
                .populate("products.stockId")
                .populate("batchRef")
            return orders;
        }
    },


    Mutation: {
        createOrder: async (_: any, { data }: { data: OrderType }, context: ContextTypes) => {
            // create order
            const order = await Order.create({
                batchRef: data.batchRef,
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
        deleteOrderById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            const order = await Order.findByIdAndDelete(id)
            if (!order) throw new Error("Failed to Delete a Order.")

            return {
                status: true,
                message: 'The order has been deleted successfully',
            }
        },
        updateOrderById: async (_: any, args: any, context: ContextTypes) => {
            const order = await Order.findOneAndUpdate({ _id: args.id }, args.data)
            if (!order) throw new Error("Failed to Update the Order.")

            return {
                status: true,
                message: 'The order has been updated successfully'
            };
        }
    }
};

export default orderResolver;