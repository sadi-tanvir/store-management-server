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

export type CategoryType = {
    data: {
        name: string;
        description: string
    }
}