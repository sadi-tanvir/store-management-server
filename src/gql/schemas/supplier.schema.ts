import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        suppliers: [Supplier!]!
        supplierById(id: ID!): Supplier
    }

    extend type Mutation {
        createSupplier(data:SupplierInput!): SupplierResponse
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
