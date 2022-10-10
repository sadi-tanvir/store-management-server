import { gql } from 'apollo-server-express'


export default gql`
    
    extend type Query {
        users: [User!]!
        darkMOde: Boolean!
    }

    extend type Mutation {
        signUpUser(userData:UserSignUpInput!): UserResponse
        signInUser(userData:UserSignInInput!): UserResponse
    }

    type UserResponse {
        status: Boolean!
        message: String!
        user: User
        token: String
    }

    type User {
        _id: ID
        name: String!
        email: String!
        password: String!
        image: String
        phone: String
        role: String
        accountStatus: String
        darkMode: Boolean
    }

    input UserSignUpInput {
        name: String!
        email: String!
        password: String!
        phone: String!
    }

    input UserSignInInput {
        email: String!
        password: String!
    }
`
