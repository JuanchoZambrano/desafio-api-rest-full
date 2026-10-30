export interface Order {
    id: number;
    userId: number;
    totalAmount: number;
    status: "pendiente" | "completada";
    date: string;
}
export const orders: Order[] = [];

/*de Roberto*/