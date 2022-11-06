import { gql } from 'apollo-server-express'


export default gql`
    type SimpleResponse {
        status: Boolean!
        message: String
    }
    
    input BrandInputRef {
        id: ID
        name: String
    }
    
    type BrandRef {
        id: Brand
        name: String
    }

    input CategoryInputRef {
        id: ID
        name: String
    }

    type CategoryRef {
        id: Category
        name: String
    }

    input SupplierInputRef {
        id: ID
        name: String
    }

    type SupplierRef {
        id: Supplier
        name: String
        email: String
        phone: String
    }
`