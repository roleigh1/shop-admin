
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./protectedRoutes";
import {LoginPage} from "./Login/Login";
import Promotions from "./Promotions/Promotions";
import Home from "./Home/Home";
import { MyProvider } from "./ContextApi";
import Inventory from "./ShopInventory/ShopInventory";
import OrdersSite from "./Orders/Orders";
import ContentManager from "./ContentManager/ContentManager";

function App() {
  return (
    <MyProvider>
      <AppContent />
    </MyProvider>
  );
}

function AppContent() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route
          path="/contentManager"
          element={
            <PrivateRoutes>
              <ContentManager />
            </PrivateRoutes>
          }
        />

        <Route
          path="/home"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />

        <Route
          path="/inventory"
          element={
            <PrivateRoutes>
              <Inventory />
            </PrivateRoutes>
          }
        />

        <Route
          path="/orders"
          element={
            <PrivateRoutes>
              <OrdersSite />
            </PrivateRoutes>
          }
        />

        <Route
          path="/promotions"
          element={
            <PrivateRoutes>
              <Promotions />
            </PrivateRoutes>
          }
        />

      </Routes>
    </Router>
  );
}


export default App;