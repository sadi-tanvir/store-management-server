import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        categories: [Category]
    }

    extend type Mutation {
        createCategory(data:CategoryInputData!): CategoryResponse
        deleteCategoryById(id: ID!): CategoryResponse
        updateCategoryById(id: ID!, data:CategoryInputData!): CategoryResponse
    }

    input CategoryInputData {
        name: String!
        description: String
    }

    type CategoryResponse {
        status: Boolean!
        message: String!
        category: Category
    }

    type Category {
        _id: ID
        name: String!
        description: String
    }
`