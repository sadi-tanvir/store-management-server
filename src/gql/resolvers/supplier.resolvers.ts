// import dotenv from "dotenv"
// dotenv.config()
import Supplier from "../../models/Supplier";
import { ContextTypes, SupplierType } from "../../types/resolvers.types";
import { createSupplierService, getSuppliersService, getSupplierByIdService } from "../services/supplier.services";
import { checkAdminService } from "../services/user.services";




const supplierResolver = {
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
        }
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
        },
        deleteSupplierById: async (_: any, { id }: { id: string }, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to delete a supplier");

            const supplier = await Supplier.findByIdAndDelete(id)
            if (!supplier) throw new Error("Failed to Delete a Supplier.")

            return {
                status: true,
                message: 'The supplier has been deleted successfully',
            }
        },
        updateSupplierById: async (_: any, args: any, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to update supplier");

            const supplier = await Supplier.findOneAndUpdate({ _id: args.id }, args.data)
            if (!supplier) throw new Error("Failed to Update the Supplier.")

            return {
                status: true,
                message: 'The supplier has been updated successfully'
            }
        }
    }
};

export default supplierResolver;