import { useContext } from "react";
import {Navigate} from 'react-router';
import { AuthContext } from "../context/authContext";

const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    return user ? children : <Navigate to={"/login"} replace/>
}
export default PrivateRoute;