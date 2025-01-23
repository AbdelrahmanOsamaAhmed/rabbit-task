import { useMemo, useState } from "react";
import DataTable from "../ui/DataTable/DatatTable";
import { OrdersColumns } from "./OrdersColumns";
import { OrdersData } from "./OrdersData";
import { OrderStatus } from "@/types/Order";
import OrderStatusDropDown from "../OrderStatusDropDown/OrderStatusDropDown";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

const OrdersTable = () => {
  const [orderStatus, setOrderStatus] = useState<OrderStatus | "All">("All");
  const [customerName, setCustomerName] = useState<string>("");
  const [sortByDate, setSortByDate] = useState<boolean>(false);

  const onOrderStatusValueChangeHandler = (e: string) => {
    const value = e as OrderStatus | "All";
    setOrderStatus(value);
  };

  const onCustomerNameSearchHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerName(e.target.value);
  };

  const sortByDateCheckboxHandler = () => setSortByDate((prev) => !prev);

  const filteredData = useMemo(() => {
    const data = OrdersData.filter((item) => {
      const matchesStatus =
        orderStatus === "All" || item.orderStatus === orderStatus;
      const matchesCustomerName = item.customerName
        .toLowerCase()
        .includes(customerName.toLowerCase());
      return matchesStatus && matchesCustomerName;
    });
    return sortByDate
      ? data.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      : data;
  }, [orderStatus, customerName, sortByDate]);

  return (
    <div className="space-y-6">
      <div className="mb-5 flex gap-5 justify-center flex-wrap">
        <OrderStatusDropDown
          status={orderStatus}
          onValueChangehandler={onOrderStatusValueChangeHandler}
        />
        <Input
          placeholder="Search by customer name"
          value={customerName}
          onChange={onCustomerNameSearchHandler}
          className="max-w-72"
        />
        <div className="flex gap-5 items-center">
          <p>Sort by Date</p>
          <Checkbox onCheckedChange={sortByDateCheckboxHandler} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <DataTable
          columns={OrdersColumns}
          data={filteredData}
          dataPerPage={5}
          noDataText="No orders found."
        />
      </div>
    </div>
  );
};

export default OrdersTable;
