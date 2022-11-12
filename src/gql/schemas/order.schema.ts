import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        orders: [Order]
    }

    extend type Mutation {
        createOrder(data:OrderInputData!): OrderResponse
        deleteOrderById(id: ID!): SimpleResponse
        updateOrderById(id: ID!, data:OrderUpdateInputData!): SimpleResponse
    }

    input OrderInputData {
        userId: String!
        email: String!
        phone: String
        address: String!
        products: [CartProductInput]
        amount: Int!
    }

    input OrderUpdateInputData {
        paymentStatus: String
        trxId: String
        orderStatus: String
    }

    input CartProductInput {
        stockId: String!
        qty: Int!
        price: Int!
        name: String!
        imageUrl: String
        category: String
        brand: String
        unit: String
    }

    type OrderResponse {
        status: Boolean!
        message: String!
        order: Order
    }

    type Order {
        _id: ID
        userId: User
        products: [CartProductType]
        email: String
        phone: String
        address: String
        amount: Int
        paymentStatus: String
        trxId: String
        orderStatus: String
    }

    type CartProductType {
        _id: ID
        stockId: Stock
        qty: Int!
        price: Int!
        name: String!
        imageUrl: String
        unit: String
        category: String
        brand: String
    }

`