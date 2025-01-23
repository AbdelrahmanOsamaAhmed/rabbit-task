export type OrderStatus = "New" | "Picking" | "Delivering" | "Delivered";

export type Order = {
  orderId: number;
  customerName: string;
  orderStatus: OrderStatus;
  createdAt: Date;
  items: string[];
};
