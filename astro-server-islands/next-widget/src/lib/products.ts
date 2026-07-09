export interface Product {
  id: string;
  name: string;
  price: number;
}

export async function getProducts(): Promise<Product[]> {
  return [
    { id: '1', name: 'Wireless Headphones', price: 79.99 },
    { id: '2', name: 'Mechanical Keyboard', price: 129.0 },
    { id: '3', name: 'USB-C Hub', price: 49.5 },
  ];
}
