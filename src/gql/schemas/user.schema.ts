import { gql } from 'apollo-server-express'


export default gql`
    

    extend type Mutation {
        signUpUser(userData:UserSignUpInput!): User
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
    }

    input UserSignUpInput {
        name: String!
        email: String!
        password: String!
        phone: String!
    }

`

// extend type Query {

// }