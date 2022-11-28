import { ObjectId } from "mongodb";
import Supplier from "../../models/Supplier";
import { SupplierServiceType } from "../../types/services.types";


// create product service
export const createSupplierService = async (data: SupplierServiceType) => {
    const supplier = await Supplier.create({
        name: data.name,
        email: data.email,
        contactNumber: data.contactNumber,
        presentAddress: data.presentAddress,
        permanentAddress: data.permanentAddress,
        imageUrl: data.imageUrl,
        brand: {
            id: data.brand.id ? new ObjectId(data.brand.id) : new ObjectId('637daf908b9eee9fe47d9885'),
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
export const getSupplierByIdService = async (id: string) => {
    const product = await Supplier.findOne({ _id: new ObjectId(id) })
        .populate('brand.id');

    return product;
}