// import dotenv from "dotenv"
// dotenv.config()
import { ContextTypes, StockType } from "../../types/resolvers.types";
import { checkAdminService } from "../services/user.services";
import { createStockService, getStocksService } from "../services/stock.services";


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
        }
    }
};

export default stockResolver;