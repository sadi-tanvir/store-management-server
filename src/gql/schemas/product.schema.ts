import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        products: [Product]
        productById(id: ID!): Product
    }

    extend type Mutation {
        createProduct(data: ProductInputData!): ProductResponse
    }

    input ProductInputData {
        name: String!
        description: String
        unit: String!
        imageUrl: [String]
        category: CategoryInput
        brand: BrandInputRef
    }

    input CategoryInput {
        id: ID
        name: String
    }

    input BrandInputRef {
        id: ID
        name: String
    }

    type ProductResponse {
        status: Boolean!
        message: String!
        product: Product
    }

    type Product {
        _id: ID
        name: String!
        description: String
        unit: String
        imageUrl: [String]
        category: CategoryRef
        brand: BrandRef
    }

    type CategoryRef {
        name: String
        id: Category
    }

    type BrandRef {
        name: String
        id: Brand
    }
    
    type Supplier {
        name: String
        email: String
        brand: BrandRef 
    }
`