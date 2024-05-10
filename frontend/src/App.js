import React, { useEffect ,useState} from 'react';
import {HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './Login/Login';
import Home from './Home/Home';
import { MyProvider, MyContext, useMyContext } from './ContextApi';
import Inventory from './ShopInventory/ShopInventory';
import OrdersSite from './Orders/Orders';
import ContentManager from './ContentManager/ContentManager';
function App() { 
  const [token, setToken] = useState(null);

  const handleTokenReceived = (receivedToken) => {
    setToken(receivedToken);
  };

  return (
    <MyProvider>
      <AppContent onTokenReceived={handleTokenReceived} />

    </MyProvider>
  );
}

function AppContent({ onTokenReceived }) {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage onTokenReceived={onTokenReceived}/>} />
        <Route path="/contentManager" element={<ContentManager/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/orders" element={<OrdersSite />} />
      </Routes>
    </Router>
  );
}

export default App;
