import { BrowserRouter, Routes, Route, redirect, Navigate } from "react-router";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./routes/PrivateRoute";
import Login from "./page/Login";
import Register from "./page/Register";
import Leads from "./page/Leads";
import LeadForm from "./page/Leadform";
import { useAuth } from "./context/authContext";
import LeadsList from "./page/LeadsList";
// import NotFound from "./pages/NotFound";

const App = () => {
  const {user} = useAuth();
  return <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={user ? <Navigate to={"/"}/> : <Navigate to={"/login"}/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/leads" element={<ProtectedRoute><LeadsList /></ProtectedRoute>} />
      <Route path="/leads/new" element={<ProtectedRoute><LeadForm /></ProtectedRoute>} />
      <Route path="/leads/edit/:id" element={<ProtectedRoute><LeadForm /></ProtectedRoute>} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
};

export default App;