import dotenv from "dotenv"
import { ObjectId } from "mongodb";
dotenv.config()
import Supplier from "../../models/Supplier";
import { BrandType, ContextTypes, SupplierType } from "../../types/resolvers.types";
import { createSupplierService, getSuppliersService, getSupplierByIdService } from "../services/supplier.services";
import { checkAdminService, createUserService, isUserExistService } from "../services/user.services";




const brandResolver = {
    Query: {
        suppliers: async (_: any, args: any, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            // get all suppliers
            const suppliers = await getSuppliersService();
            return suppliers;
        },
        supplierById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            // get supplier by id
            const suppliers = await getSupplierByIdService(id);
            return suppliers;
        },

    },

    Mutation: {
        createSupplier: async (_: any, { data }: SupplierType, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add product");

            // create supplier
            const supplier = await createSupplierService(data);
            if (!supplier) throw new Error("Failed to Create a Supplier.")

            return {
                status: true,
                message: 'The supplier has created successfully',
                supplier: supplier
            }
        }
    }
};

export default brandResolver;