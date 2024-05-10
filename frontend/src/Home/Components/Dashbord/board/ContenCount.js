import React,{useEffect}from "react";
import { MyProvider,useMyContext } from "../../../../ContextApi";
export default function OrderCounter() {
const {counter,fetchCounter} = useMyContext(MyProvider)

useEffect(() => {
    fetchCounter(); 
},[])
    return (
        <div className="order-counter" >
        <div style={{ display: "flex", flexDirection: "column", textAlign: "center",opacity:"1" }}>
            <h5 style={{ marginTop: "2.7rem" ,}}>Sales</h5>
            <span >{counter && counter.countOrder}</span>
            <hr style={{ width: "98%",marginTop:"4rem" ,opacity:"0.4"}} />
          
            <h5 style={{ marginTop: "2rem" }}>Bestellungen in der Datenbank seit Montag</h5>
               <span >{counter && counter.ordersCountLastMonday}</span> 
        </div>
    </div>
    )

}