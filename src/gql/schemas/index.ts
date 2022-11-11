import { gql } from 'apollo-server-express'
import globalSchema from './global.schema'
import userSchema from "./user.schema"
import brandSchema from "./brand.schema"
import categorySchema from "./category.schema"
import productSchema from "./product.schema"
import supplierSchema from "./supplier.schema"
import stockSchema from "./stock.schema"
import orderSchema from './order.schema'

const rootSchema = gql`
    type Query {
        _:Boolean
    }
    type Mutation {
        _:Boolean
    }
`
export default [
    rootSchema,
    globalSchema,
    userSchema,
    brandSchema,
    categorySchema,
    productSchema,
    supplierSchema,
    stockSchema,
    orderSchema
]