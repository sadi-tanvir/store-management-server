import { gql } from 'apollo-server-express'


export default gql`
    
    extend type Query {
        ownerProfile(id: ID!): OwnerResponse!
        users: [User!]!
        userById(id: ID!): User!
        darkMode: Boolean!
    }

    extend type Mutation {
        signUpUser(userData:UserSignUpInput!): UserResponse
        signInUser(userData:UserSignInInput!): UserResponse
        updateUserByAdmin(userData:updateUserByAdminInput!): SimpleResponse
        deleteUserById(id: ID!): SimpleResponse
        updateOwnerProfile(userData:updateOwnerProfileInput!): SimpleResponse
    }

    type UserResponse {
        status: Boolean!
        message: String!
        user: User
        token: String
    }

    type OwnerResponse {
        status: Boolean
        owner: User
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
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

    input updateOwnerProfileInput {
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
