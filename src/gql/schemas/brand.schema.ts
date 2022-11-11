import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        brands: [Brand]
        brandsWithReference: [Brand]
        getBrandWithId(id: ID!): Brand
    }

    extend type Mutation {
        createBrand(data:BrandInputData!): BrandResponse
        deleteBrandById(id: ID!): SimpleResponse
        updateBrandById(id: ID!, data:BrandUpdateInputData!): BrandResponse
    }

    input BrandInputData {
        name: String!
        description: String
        email: String!
        phone: String
        website: String
        location: String
        products: [ID]
        suppliers: [SupplierInputData]
    }

    input BrandUpdateInputData {
        name: String
        description: String
        email: String
        phone: String
        website: String
        location: String
        status: String
        products: [ID]
        suppliers: [SupplierInputData]
    }

    input SupplierInputData {
        name: String
        email: String
        phone: String
        id: ID
    }

    type BrandResponse {
        status: Boolean!
        message: String!
        brand: Brand
    }

    type Brand {
        _id: ID
        name: String!
        description: String
        email: String
        phone: String
        website: String
        location: String
        status: String
        products: [Product]
        suppliers: [SupplierRef]
    }

`