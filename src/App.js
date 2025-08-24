import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./page/Login";
import Register from "./page/Register";
import Leads from "./page/Leads";
import LeadForm from "./page";
// import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
      <Route path="/leads/new" element={<ProtectedRoute><LeadForm /></ProtectedRoute>} />
      <Route path="/leads/edit/:id" element={<ProtectedRoute><LeadForm /></ProtectedRoute>} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;