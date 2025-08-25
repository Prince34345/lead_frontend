import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./routes/PrivateRoute";
import Login from "./page/Login";
import Register from "./page/Register";
import Leads from "./page/Leads";
import LeadForm from "./page/Leadform";
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