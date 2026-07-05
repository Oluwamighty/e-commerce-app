export interface Product  {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    thumbnail: string,
    rating: number,
}

export interface CartItemType extends Product {
    quantity: number
}