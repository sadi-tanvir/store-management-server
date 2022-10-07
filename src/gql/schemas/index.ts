import { gql } from 'apollo-server-express'
import userSchema from "./user.schema"
import brandSchema from "./brand.schema"
import categorySchema from "./category.schema"
import productSchema from "./product.schema"

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
    userSchema,
    brandSchema,
    categorySchema,
    productSchema
]