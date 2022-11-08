import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        products: [Product]
        productById(id: ID!): Product
    }

    extend type Mutation {
        createProduct(data: ProductInputData!): ProductResponse
        updateProductById(id: ID!, data:ProductInputData!): ProductResponse
        deleteProductById(id: ID!): ProductResponse
    }

    input ProductInputData {
        name: String!
        description: String
        unit: String!
        imageUrl: String
        category: CategoryInputRef
        brand: BrandInputRef
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
        imageUrl: String
        category: CategoryRef
        brand: BrandRef
    }

    
    type Supplier {
        name: String
        email: String
        brand: BrandRef 
    }
`