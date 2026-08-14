import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((s) => s.auth);
    const location = useLocation();

    if (!isAuthenticated) {
        // FIX: current location save karo, taaki login ke baad wahin wapas bhej sako
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;


// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { isAuthenticated, user } = useSelector((s) => s.auth);

//   if (!isAuthenticated) return <Navigate to="/login" replace />;
//   if (allowedRoles && !allowedRoles.includes(user?.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };