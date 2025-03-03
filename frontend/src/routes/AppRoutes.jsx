import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NearbyTolls from "../pages/NearbyTolls";
import TollPayment from "../pages/CashfreePayment";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tolls" element={<NearbyTolls />} />
      <Route path="/payment" element={<TollPayment />} />
    </Routes>
  );
};

export default AppRoutes;
