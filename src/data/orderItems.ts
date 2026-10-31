export interface Order {
    id: number;
    userId: number;
    totalAmount: number;
    status: "pendiente" | "completada";
    date: string;
}
export const orders: Order[] = [];

/*de Roberto*/
export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  subtotal: number;
}

export let orderItems: OrderItem[] = [];