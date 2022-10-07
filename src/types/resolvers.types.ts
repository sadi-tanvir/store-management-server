export type ContextTypes = {
    email: string
}

export type UserType = {
    userData: {
        name: string;
        email: string;
        password: string;
        phone: string;
    }
}

export type UserServiceType = {
    name: string;
    email: string;
    password: string;
    phone: string;
}

export type BrandType = {
    data: {
        name: string;
        description: string;
        email: string;
        phone: string;
        website: string;
        location: string;
        products: string[];
        suppliers: {
            name: string;
            email: string;
            phone: string;
            id: string;
        }[];
    }
}

export type ProductType = {
    data: {
        name: string;
        description: string;
        unit: string;
        imageUrl: string[];
        category: {
            id: string;
            name: string;
        }
        brand: {
            id: string;
            name: string;
        }
    }
}

export type CategoryType = {
    data: {
        name: string;
        description: string
    }
}



export type SupplierType = {
    data: {
        name: string;
        email: string;
        contactNumber: string;
        tradeLicenseNumber: string;
        presentAddress: string;
        permanentAddress: string;
        imageUrl: string;
        brand: {
            id: string;
            name: string;
        }
    }
}