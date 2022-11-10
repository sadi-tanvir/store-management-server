// import dotenv from "dotenv"
// dotenv.config()
import { ContextTypes, StockType } from "../../types/resolvers.types";
import { checkAdminService } from "../services/user.services";
import { createStockService, getStocksService } from "../services/stock.services";
import Stock from "../../models/Stock";


const stockResolver = {
    Query: {
        stocks: async (_: any, args: any, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to view stocks");

            // find all stocks
            const stocks = await getStocksService()
            return stocks;
        }
    },

    Mutation: {
        createStock: async (_: any, { data }: StockType, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            // create stock
            const stock = await createStockService(data)
            if (!stock) throw new Error("Failed to Create a Stock.")

            return {
                status: true,
                message: 'The Stock has created successfully',
                stock: stock
            }
        },
        updateStockQuantity: async (_: any, { id, data }: { id: string; data: { reference: string; } }, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            // update stock quantity
            if (data.reference === 'increase') {
                const stock = await Stock.findOne({ _id: id })
                if (!stock) throw new Error("Failed to find stock")
                stock.quantity = stock.quantity + 1
                stock.sellCount = stock.sellCount - 1
                await stock.save()
            } else {
                const stock = await Stock.findOne({ _id: id })
                if (!stock) throw new Error("Failed to find stock")
                stock.quantity = stock.quantity - 1
                stock.sellCount = stock.sellCount + 1
                await stock.save()
            }

            return {
                status: true,
                message: 'The Stock has updated successfully',
            }
        },
        deleteStockById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to delete a stock");

            const stock = await Stock.findByIdAndDelete(id)
            if (!stock) throw new Error("Failed to Delete a Stock.")

            return {
                status: true,
                message: 'The stock has been deleted successfully',
            }
        }
    }
};

export default stockResolver;