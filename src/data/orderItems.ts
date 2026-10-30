export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  subtotal: number;
}

export let orderItems: OrderItem[] = [];