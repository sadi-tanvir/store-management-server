import { ObjectId } from "mongodb";
import Stock from "../../models/Stock";
import { StockServiceType } from "../../types/services.types";


// create stock service
export const createStockService = async (data: StockServiceType) => {
    const stock = await Stock.create({
        productId: data.productId,
        name: data.name,
        description: data.description,
        unit: data.unit,
        imageUrl: data.imageUrl,
        price: data.price,
        quantity: data.quantity,
        status: data.status,
        category: {
            name: data.category.name,
            id: new ObjectId(data.category.id)
        },
        brand: {
            name: data.brand.name,
            id: new ObjectId(data.brand.id)
        },
        suppliedBy: {
            name: data.suppliedBy.name,
            id: new ObjectId(data.suppliedBy.id)
        }
    })

    return stock;
}


// find all stocks service
export const getStocksService = async () => {
    const stocks = await Stock.find()
        .populate('productId')
        .populate('brand.id')

    return stocks;
}