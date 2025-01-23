import { Order } from "@/types/Order";
import { ColumnDef } from "@tanstack/react-table";

export const OrdersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "customerName",
    header: "Customer Name",
    size: 150,
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    size: 150,
  },
  {
    accessorKey: "items",
    header: "Items",
    size: 150,
    cell: ({ getValue }) => (
      <div>
        {getValue<string[]>().map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    size: 150,
    cell: ({ getValue }) =>
      new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(getValue<Date>()),
  },
];
