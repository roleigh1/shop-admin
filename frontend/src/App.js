import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Login/Login";
import Home from "./Home/Home";
import PropTypes from "prop-types"; // Import PropTypes
import { MyProvider } from "./ContextApi";
import Inventory from "./ShopInventory/ShopInventory";
import OrdersSite from "./Orders/Orders";
import ContentManager from "./ContentManager/ContentManager";
import PrivateRoute from "./PrivateRoute";
function App() {
  const [token, setToken] = useState(null);

  const handleTokenReceived = (receivedToken) => {
    setToken(receivedToken);
  };

  return (
    <MyProvider>
      <AppContent token={token} onTokenReceived={handleTokenReceived} />
    </MyProvider>
  );
}

function AppContent({ token, onTokenReceived }) {
  const isAuthenticated = !!token;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage onTokenReceived={onTokenReceived} />}
        />
        <Route path="/contentManager" element={<ContentManager />} />
        <Route path="/home" element={<PrivateRoute  element={Home} isAuthenticated={isAuthenticated}/>} />
        <Route path="/inventory" element={<PrivateRoute  element={Inventory} isAuthenticated={isAuthenticated}/>} />
        <Route path="/orders"  element={<PrivateRoute  element={OrdersSite} isAuthenticated={isAuthenticated}/>} />
      </Routes>
    </Router>
  );
}
AppContent.propTypes = {
  onTokenReceived: PropTypes.func.isRequired,
};

export default App;
