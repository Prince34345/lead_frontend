import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  const { login } = useAuth();
//   const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
    //   navigate("/leads");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded w-80 space-y-4">
        <h2 className="text-xl font-bold">Login</h2>
        <input className="border p-2 w-full" placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" className="border p-2 w-full" placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;