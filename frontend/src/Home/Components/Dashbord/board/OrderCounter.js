import React, { useEffect } from "react";
import { MyProvider, useMyContext } from "../../../../ContextApi";
export default function OrderCounter() {
  const { counter, fetchCounter } = useMyContext(MyProvider);

  useEffect(() => {
    fetchCounter();
  }, []);
  return (
    <div className="order-counter">
      <div className="flex flex-col text-center opacity-100">
        <h5 className="mt-20 text-sm "> Finished Sales</h5>
        <span>{counter && counter.countOrder}</span>


        <h5 className=" pt-20 text-sm">Unprocessed orders</h5>
        <span>{counter && counter.newArrivedOrders}</span>
      </div>
    </div>
  );
}
