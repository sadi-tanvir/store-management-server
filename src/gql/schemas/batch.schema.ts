import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        getAllBatchesRef: [Batch]
        getBatchesByUserRef(userId: ID!): [Batch]
        getOpenBatchByUserRef(userId: ID!): Batch
    }

    extend type Mutation {
        createBatch(data:BatchInputData!): BatchResponse
    }

    input BatchInputData {
        userId: String!
        batchNo: String!
        description: String
        previousAmount: Int
    }

    type BatchResponse {
        status: Boolean!
        message: String!
        batch: Batch
    }

    type Batch {
        _id: ID
        userId: User
        description: String
        batchNo: String
        previousAmount: Int
        status: String
    }

`