export type UserServiceType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
}

export type ProductServiceType = {
    name: string;
    description: string;
    unit: string;
    imageUrl: string[];
    category: {
        id: string;
        name: string;
    },
    brand: {
        id: string;
        name: string;
    }
}

export type StockServiceType = {
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


export type SupplierServiceType = {
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