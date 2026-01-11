import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Inventory from "./pages/inventory";
import ProtectedRoute from "./components/protectedRoute";
import Users from "./pages/users";
import Drivers from "./pages/drivers";
import Orders from "./pages/orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/drivers" element={<ProtectedRoute><Drivers /></ProtectedRoute>}/>
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
