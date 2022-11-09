import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        suppliers: [Supplier!]!
        supplierById(id: ID!): Supplier
    }

    extend type Mutation {
        createSupplier(data:SupplierInput!): SupplierResponse
        deleteSupplierById(id: ID!): SupplierResponse
        updateSupplierById(id: ID!, data:SupplierUpdateInput!): SupplierResponse
    }

    input SupplierInput {
        name: String!
        email: String!
        contactNumber: String!
        presentAddress: String
        permanentAddress: String
        imageUrl: String
        brand: BrandInputRef
    }

    input SupplierUpdateInput {
        name: String!
        email: String!
        contactNumber: String
        presentAddress: String
        permanentAddress: String
        imageUrl: String
        status: String
        brand: BrandInputRef
    }

    type SupplierResponse {
        status: Boolean!
        message: String!
        supplier: Supplier
    }

    type Supplier {
        _id: ID
        name: String
        email: String
        contactNumber: String
        presentAddress: String
        permanentAddress: String
        imageUrl: String
        brand: BrandRef
    }
`
