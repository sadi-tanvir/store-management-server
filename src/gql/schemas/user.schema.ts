import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        users: [User]
    }

    extend type Mutation {
        signUpUser(userData:UserSignUpInput!): User
        signInUser(userData:UserSignInInput!): User
    }

    type User {
        _id: ID
        name: String!
        email: String!
        password: String!
    }

    input UserSignUpInput {
        name: String!
        email: String!
        password: String!
    }

    input UserSignInInput {
        email: String!
        password: String!
    }
`