import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        stocks: [Stock]
        getStocksByCategory(category: String!): [Stock]
        getStocksWithDetails: [Stock]
    }

    extend type Mutation {
        createStock(data: StockInputData!): StockResponse
        updateStockQuantity(id:ID!, data: StockUpdateInfo!):SimpleResponse
        deleteStockById(id: ID!): SimpleResponse
        updateStockById(id:ID!, data: StockUpdateInputData!):StockResponse
    }

    input StockInputData {
        productId: String!
        name: String!
        description: String
        unit: String
        imageUrl: String
        price: Int
        quantity: Int
        status: String
        category: CategoryInputRef
        brand: BrandInputRef
        suppliedBy: SupplierInputRef
    }

    input StockUpdateInputData {
        name: String!
        description: String
        unit: String
        imageUrl: String
        price: Int
        quantity: Int
        sellCount: Int
        status: String
        category: CategoryInputRef
        brand: BrandInputRef
        suppliedBy: SupplierInputRef
    }

    input StockUpdateInfo { 
        reference: String!
    }

    type StockResponse {
        status: Boolean!
        message: String!
        stock: Stock
    }

    type Stock {
        _id: ID
        productId: Product
        name: String!
        description: String
        unit: String
        imageUrl: String
        price: Int
        quantity: Int
        status: String
        sellCount: Int
        category: CategoryRef
        brand: BrandRef
        suppliedBy: SupplierRef
    }

    
`