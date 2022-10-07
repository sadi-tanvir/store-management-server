import { ObjectId } from "mongodb";
import Product from "../../models/Product";
import { ProductServiceType } from "../../types/services.types";



// create product service
export const createProductService = async (data: ProductServiceType) => {
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

    return product;
}


// find all products service
export const getProductsService = async () => {
    const products = await Product.find()
        .populate('category.id')
        .populate('brand.id');

    return products;
}


// find all products service
export const getProductByIdService = async (id:string) => {
    const product = await Product.findOne({ _id: new ObjectId(id) })
        .populate('category.id')
        .populate('brand.id');

    return product;
}