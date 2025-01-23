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
  const [customerNameSearch, setCustomerNameSearch] = useState<string>("");
  const [sortByDate, setSortByDate] = useState<boolean>(false);
  const [orderIdSearch, setOrderIdSearch] = useState<number>();

  const onOrderStatusValueChangeHandler = (e: string) => {
    const value = e as OrderStatus | "All";
    setOrderStatus(value);
  };

  const onCustomerNameSearchHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerNameSearch(e.target.value);
  };

  const onOrderIdSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) === 0) return setOrderIdSearch(undefined);
    setOrderIdSearch(Number(e.target.value));
  };

  const sortByDateCheckboxHandler = () => setSortByDate((prev) => !prev);

  const filteredData = useMemo(() => {
    const data = OrdersData.filter((item) => {
      const matchesStatus =
        orderStatus === "All" || item.orderStatus === orderStatus;
      const matchesCustomerName = item.customerName
        .toLowerCase()
        .includes(customerNameSearch.toLowerCase());
      const matchesOrderID = !orderIdSearch || item.orderId === orderIdSearch;
      return matchesStatus && matchesCustomerName && matchesOrderID;
    });
    return sortByDate
      ? data.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      : data;
  }, [orderStatus, customerNameSearch, sortByDate, orderIdSearch]);

  return (
    <div className="space-y-6">
      <div className="mb-5 flex gap-5 justify-center flex-wrap">
        <OrderStatusDropDown
          status={orderStatus}
          onValueChangehandler={onOrderStatusValueChangeHandler}
        />
        <Input
          placeholder="Search by customer name"
          value={customerNameSearch}
          onChange={onCustomerNameSearchHandler}
          className="max-w-72"
        />
        <Input
          placeholder="Search by Order ID"
          value={orderIdSearch}
          onChange={onOrderIdSearchHandler}
          className="max-w-72"
          type="number"
          min={1}
        />
        <div className="flex gap-5 items-center">
          <p>Sort by Date</p>
          <Checkbox
            checked={sortByDate}
            onCheckedChange={sortByDateCheckboxHandler}
          />
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
