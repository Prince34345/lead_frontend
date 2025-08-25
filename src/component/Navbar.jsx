import { Link } from "react-router";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/leads" className="font-bold text-lg">Lead Manager</Link>
      <div className="flex gap-4">
        {user && 
          <>
            <span>{user?.email}</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>}
      </div>
    </nav>
  );
};

export default Navbar;