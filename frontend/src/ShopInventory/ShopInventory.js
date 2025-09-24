import React from "react";
import Navbar from "../Home/Components/Dashbord/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import BackgroundDelete from "./Components/Backgrounds/BackgroundTable";
import BackgroundInsert from "./Components/Backgrounds/BackgroundInsert";
import InsertData from "./Components/InsertIntroDb";
import InventoryTable from "./Components/ShopTables";

import "./style.css";
export default function Inventory() {
  return (
    <div className="">
      <div className="mt-10">
        <Navbar />
      </div>
      <div
        className="insert-Table flex flex-row justify-center items-center gap-4  "

      >
        <div>
          <BackgroundInsert >
            <InsertData />
          </BackgroundInsert>
        </div>

        <div>
          <BackgroundDelete>
            <InventoryTable />
          </BackgroundDelete>
        </div>



      </div>
    </div>
  );
}
