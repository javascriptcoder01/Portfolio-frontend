// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useRef } from "react";
// import { logoutRequest } from "../../redux/slices/authSlice";

// export default function LogoutButton({ className }) {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { isAuthenticated, logoutLoading } = useSelector((s) => s.auth);
//     const wasAuthenticated = useRef(isAuthenticated);

//     // Jab isAuthenticated true → false ho, tabhi navigate karo
//     useEffect(() => {
//         if (wasAuthenticated.current && !isAuthenticated) {
//             navigate("/login", { replace: true });
//         }
//         wasAuthenticated.current = isAuthenticated;
//     }, [isAuthenticated, navigate]);

//     const handleLogout = () => {
//         dispatch(logoutRequest());
//     };

//     return (
//         <button onClick={handleLogout} disabled={logoutLoading} className={className}>
//             {logoutLoading ? "Logging out..." : "Logout"}
//         </button>
//     );
// }



import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FastForwardIcon, LogOutIcon } from "lucide-react"; // ya jahan se bhi tum icon import kar rahe ho
import { logoutRequest } from "../../redux/slices/authSlice";

export default function LogoutButton({ showText = true }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, logoutLoading } = useSelector((s) => s.auth);
    const wasAuthenticated = useRef(isAuthenticated);

    // isAuthenticated true → false hote hi redirect karo
    useEffect(() => {
        if (wasAuthenticated.current && !isAuthenticated) {
            navigate("/login", { replace: true });
        }
        wasAuthenticated.current = isAuthenticated;
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        dispatch(logoutRequest());
    };

    return (
        <div className="border-t shrink-0">
            <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed
                    ${!showText && "justify-center"}`}
            >
                <LogOutIcon size={20} className="shrink-0" />
                {showText && (
                    <span className="font-medium whitespace-nowrap">
                        {logoutLoading ? "Logging out..." : "Logout"}
                    </span>
                )}
            </button>
        </div>
    );
}