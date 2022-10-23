export type ContextTypes = {
    email: string;
    role?: string;
}

export type UserType = {
    userData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone: string;
    }
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


export type StockType = {
    data: {
        productId: string;
        name: string;
        description: string;
        unit: string;
        imageUrl: string[];
        price: Number;
        quantity: Number;
        status: string;
        category: {
            name: string;
            id: string;
        };
        brand: {
            name: string;
            id: string;
        }
        suppliedBy: {
            name: string;
            id: string;
        }
    }
}