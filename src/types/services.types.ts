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