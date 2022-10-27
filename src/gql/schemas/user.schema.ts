import { gql } from 'apollo-server-express'


export default gql`
    
    extend type Query {
        users: [User!]!
        user(id: ID!): User!
        darkMode: Boolean!
    }

    extend type Mutation {
        signUpUser(userData:UserSignUpInput!): UserResponse
        signInUser(userData:UserSignInInput!): UserResponse
        updateUserByAdmin(userData:updateUserByAdminInput!): UserResponse
    }

    type UserResponse {
        status: Boolean!
        message: String!
        user: User
        token: String
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String!
        password: String
        image: String
        phone: String
        role: String
        gender: String
        currentAddress: String
        permanentAddress: String
        dateOfBirth: String
        accountStatus: String
        darkMode: Boolean
    }

    input UserSignUpInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        phone: String!
    }

    input UserSignInInput {
        email: String!
        password: String!
    }

    input updateUserByAdminInput {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        phone: String!
        role: String!
        gender: String!
        currentAddress: String!
        permanentAddress: String!
        dateOfBirth: String!
        accountStatus: String!
    }
`
