export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  categoryId: number;
}

export type NewProduct = Omit<Product, "id">;

export const products: Product[] = [];