import { gql } from 'apollo-server-express'


export default gql`
    

    extend type Mutation {
        createBrand(data:BrandInputData!): BrandResponse
    }

    type BrandResponse {
        status: Boolean!
        message: String!
        brand: Brand
    }

    type Brand {
        _id: ID
        name: String!
        description: String!
        email: String!
        phone: String
        website: String
        location: String
        status: String
        products: [Product]
        suppliers: [Supplier]
    }

    type Product {
        name: String
        description: String
        unit: String
        imageUrl: [String]
        categories: {
            id: ID
            name: String
        }
    }

    type Supplier {
        name: String
        email: String
        brand: {
            id: ID
            name: String
        }
    }
    
    input BrandInputData {
        name: String!
        description: String!
        email: String!
        phone: String
        website: String
        location: String
        products: [ID]
        suppliers: [SupplierInputData]
    }

    type SupplierInputData {
        name: String
        email: String
        phone: String
        id: ID
    }
`