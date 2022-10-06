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

    }

    type Supplier {
        
    }
    
    input BrandInputData {
        _id: ID
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