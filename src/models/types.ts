export type Seller = {
    id: number,
    name: string,
    email: string,
    role: string,
    formation: string
};

export type Product = {
    id: number,
    name: string,
    description: string,
    price: number,
    quantity: number
};

export type Client = {
    id: number,
    name: string,
    phone: string,
    email: string,
    address: string
};

export type Order = {
    id: number,
    clienteId: number,
    productId: number,
    sellerId: number,
    status: string
};