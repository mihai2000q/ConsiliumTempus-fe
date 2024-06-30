import { Badge, Button } from "@mui/material";
import { Sort } from "@mui/icons-material";
import { projectOrderProperties } from "../data/ProjectOrderPropertiesData.tsx";
import { useState } from "react";
import OrderMenu from "../../../components/order/OrderMenu.tsx";
import Order from "../../../types/Order.ts";

interface ProjectSortButtonProps {
  initialOrder: Order,
  setOrderBy: (orders: Order[]) => void
}

function ProjectSortButton({ initialOrder, setOrderBy }: ProjectSortButtonProps) {
  const [menuAnchorEl, setMenuAnchorEl] =
    useState<HTMLElement | null>(null)
  const [ordersSize, setOrdersSize] = useState(1)

  return (
    <>
      <Badge badgeContent={ordersSize === 1 ? 0 : ordersSize} color={'primary'}>
        <Button
          variant={'outlined'}
          startIcon={<Sort />}
          onClick={(e) => setMenuAnchorEl(e.currentTarget)}
          sx={{ boxShadow: 4, paddingX: 2.5 }}>
          Sort
        </Button>
      </Badge>

      <OrderMenu
        anchorEl={menuAnchorEl}
        onClose={() => setMenuAnchorEl(null)}
        orderProperties={projectOrderProperties}
        initialOrder={initialOrder}
        setOrderBy={setOrderBy}
        onSizeChange={setOrdersSize} />
    </>
  );
}

export default ProjectSortButton;