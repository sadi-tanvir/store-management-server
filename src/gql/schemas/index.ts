import { gql } from 'apollo-server-express'
import userSchema from "./user.schema"

const rootSchema = gql`
    type Query {
        _:Boolean
    }
    type Mutation {
        _:Boolean
    }
`
export default [rootSchema, userSchema]