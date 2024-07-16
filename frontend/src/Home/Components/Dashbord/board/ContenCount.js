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
        <h5 className="mt-11 text-sm ">Sales</h5>
        <span>{counter && counter.countOrder}</span>
        <hr style={{ width: "98%", marginTop: "4rem", opacity: "0.4" }} />

        <h5 className="mt-8 text-sm">Bestellungen in der Datenbank seit Montag</h5>
        <span>{counter && counter.ordersCountLastMonday}</span>
      </div>
    </div>
  );
}
