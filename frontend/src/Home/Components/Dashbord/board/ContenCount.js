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
        <h5 className="mt-20 text-sm ">Sales</h5>
        <span>{counter && counter.countOrder}</span>
        <hr className="" />

        <h5 className=" pt-20 text-sm">Bestellungen in der Datenbank seit Montag</h5>
        <span>{counter && counter.ordersCountLastMonday}</span>
      </div>
    </div>
  );
}
