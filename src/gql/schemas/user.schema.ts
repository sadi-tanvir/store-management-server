import { gql } from 'apollo-server-express'


export default gql`
    
    extend type Query {
        users: [User!]!
        user(id: ID!): User!
        darkMode: Boolean!
        deleteUserById(id: ID!): SimpleResponse
    }

    extend type Mutation {
        signUpUser(userData:UserSignUpInput!): UserResponse
        signInUser(userData:UserSignInInput!): UserResponse
        updateUserByAdmin(userData:updateUserByAdminInput!): SimpleResponse
    }

    type UserResponse {
        status: Boolean!
        message: String!
        user: User
        token: String
    }

    type SimpleResponse {
        status: Boolean!
        message: String
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
        createdAt: String
        updatedAt: String
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
