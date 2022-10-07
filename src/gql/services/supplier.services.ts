import { ObjectId } from "mongodb";
import Product from "../../models/Product";
import Supplier from "../../models/Supplier";
import { ProductServiceType } from "../../types/services.types";

export type SupplierServiceType = {
    name: string;
    email: string;
    contactNumber: string;
    tradeLicenseNumber: string;
    presentAddress: string;
    permanentAddress: string;
    imageUrl: string;
    brand: {
        id: string;
        name: string;
    }
}

// create product service
export const createSupplierService = async (data: SupplierServiceType) => {
    const supplier = await Supplier.create({
        name: data.name,
        email: data.email,
        contactNumber: data.contactNumber,
        tradeLicenseNumber: data.tradeLicenseNumber,
        presentAddress: data.presentAddress,
        permanentAddress: data.permanentAddress,
        imageUrl: data.imageUrl,
        brand: {
            id: new ObjectId(data.brand.id),
            name: data.brand.name
        }
    })

    return supplier;
}


// find all products service
export const getSuppliersService = async () => {
    const suppliers = await Supplier.find().populate('brand.id');

    return suppliers;
}


// find all products service
export const getSupplierByIdService = async (id:string) => {
    const product = await Supplier.findOne({ _id: new ObjectId(id) })
        .populate('brand.id');

    return product;
}