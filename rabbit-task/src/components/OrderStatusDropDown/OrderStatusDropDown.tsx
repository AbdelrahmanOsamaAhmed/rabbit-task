import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderStatus } from "@/types/Order";
import { Button } from "../ui/button";

const OrderStatusDropDown = ({
  status,
  onValueChangehandler,
}: {
  status: OrderStatus | "All";
  onValueChangehandler: (e: string) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Filter By Order Status:{" "}
          <span className="font-semibold">{status}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={status}
          onValueChange={onValueChangehandler}
        >
          <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="New">New</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Picking">Picking</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Delivering">
            Delivering
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Delivered">
            Delivered
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderStatusDropDown;
