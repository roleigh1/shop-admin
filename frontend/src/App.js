import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Login/Login";
import Home from "./Home/Home";
import PropTypes from "prop-types";  // Import PropTypes
import { MyProvider } from "./ContextApi";
import Inventory from "./ShopInventory/ShopInventory";
import OrdersSite from "./Orders/Orders";
import ContentManager from "./ContentManager/ContentManager";
function App() {


  return (
    <MyProvider>
      <AppContent  />
    </MyProvider>
  );
}

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage  />}
        />
        <Route path="/contentManager" element={<ContentManager />} />
        <Route path="/home" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/orders" element={<OrdersSite />} />
      </Routes>
    </Router>
  );
}


export default App;
