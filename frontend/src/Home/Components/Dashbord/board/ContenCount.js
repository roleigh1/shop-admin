import React, { useEffect } from "react";
import { MyProvider, useMyContext } from "../../../../ContextApi";

export default function OrderCounter() {
  const { counter, fetchCounter } = useMyContext(MyProvider);

  useEffect(() => {
    fetchCounter();

  }, []);

  return (
    <div className="order-counter flex flex-col text-center opacity-100">
      <div

      >
        <h5  className="mt-11">Sales</h5>
        <span>{counter && counter.countOrder}</span>
        <hr className="w-[98%] mt-16 opacity-5"/>

        <h5 className="mt-8">
        Orders received since Monday
        </h5>
        <span>{counter && counter.ordersCountLastMonday}</span>
      </div>
    </div>
  );
}
