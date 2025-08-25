import {Navigate} from 'react-router';
import { useAuth } from "../context/authContext";

const PrivateRoute = ({children}) => {
    // const {user} = useAuth();
    // if (!user) {return <Navigate to={"/login"} replace/>}
    return children;

}
export default PrivateRoute;