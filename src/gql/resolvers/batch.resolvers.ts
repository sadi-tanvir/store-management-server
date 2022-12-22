import Batch from "../../models/Batch";
import { BrandType, ContextTypes, UserType } from "../../types/resolvers.types";
import { checkAdminService, createUserService, isUserExistService } from "../services/user.services";


export type BatchType = {
    data: {
        userId: string;
        batchNo: string;
        description: string;
        previousAmount: number;
    }
}

const batchResolver = {
    Query: {
        getAllBatchesWithRef: async (_: any, args: any, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to get batches");

            const batches = await Batch.find()
                .populate("userId")
            return batches;
        },
        getAllOpenBatches: async (_: any, args: any, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to get batches");

            const batches = await Batch.find({ status: 'open' })
                .populate("userId").sort({ createdAt: 1 })
            return batches;
        },
        getBatchesByUserRef: async (_: any, { userId }: { userId: string; }, context: ContextTypes) => {
            const batches = await Batch.find({ userId })
                .populate("userId").sort({ batchNo: -1, createdAt: -1 })
            return batches;
        },
        getOpenBatchByUserRef: async (_: any, { userId }: { userId: string; }, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to get batches");

            const batches = await Batch.findOne({ userId, status: "open" })
                .populate("userId").sort({ batchNo: -1, createdAt: -1 })
            return batches;
        },
        getBatchById: async (_: any, { batchId }: { batchId: string; }, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to get batches");

            const batch = await Batch.findOne({ _id: batchId })
                .populate("userId")
            return batch;
        },
    },
    Mutation: {
        createBatch: async (_: any, { data }: BatchType, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to add the batch");

            // checking if batch exist
            const isBatchExist = await Batch.findOne({
                userId: data.userId,
                batchNo: data.batchNo
            });
            if (isBatchExist) throw new Error("This Batch already exist");

            // checking if batch exist
            const isOpenBatchExist = await Batch.findOne({
                userId: data.userId,
                status: 'open'
            });
            if (isOpenBatchExist) throw new Error("Already have a running batch");

            // create batch
            const batch = await Batch.create({
                userId: data.userId,
                batchNo: data.batchNo,
                description: data.description,
                previousAmount: data.previousAmount
            })
            if (!batch) throw new Error("Failed to Create The Batch.")

            return {
                status: true,
                message: 'The batch has been created successfully'
            }
        },
        closeBatch: async (_: any, { batchId }: { batchId: string; }, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to close the batch");

            // close the Batch
            const closeBatch = await Batch.findOneAndUpdate(
                { _id: batchId },
                { $set: { status: 'closed' } }
            );
            if (!closeBatch) throw new Error("Failed to Close the Batch.")

            return {
                status: true,
                message: 'The batch has been closed successfully'
            }
        },
        reopenBatch: async (_: any, { batchId }: { batchId: string; }, context: ContextTypes) => {
            // checking admin
            const isAdmin = await checkAdminService(context)
            if (!isAdmin) throw new Error("You are not authorized to Re-Open the batch");

            // Re-Open the Batch
            const reOpenBatch = await Batch.findOneAndUpdate(
                { _id: batchId },
                { $set: { status: 'open' } }
            );
            if (!reOpenBatch) throw new Error("Failed to Re-Open the Batch.")

            return {
                status: true,
                message: 'The batch has been Re-Opened successfully'
            }
        }
    }
};

export default batchResolver;