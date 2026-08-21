import { Bell, Menu, UserCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminRequest } from "../../redux/slices/authSlice";

const Header = ({ setMobileOpen }) => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    // console.log('Data is coming from Header component: ', user);

    useEffect(() => {
        if (isAuthenticated && !user) dispatch(fetchAdminRequest());
    }, [isAuthenticated, user, dispatch]);

    return (
        <header className="sticky top-0 z-30 bg-amber-100 shadow-sm flex items-center justify-between p-3">
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">
                <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
                    <Menu size={26} />
                </button>

                {/* FIX: greeting emoji + dynamic name */}
                <h2 className="text-2xl font-bold text-red-500">
                    Hi 👋 {user?.name || "there"}
                </h2>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-5">
                <button className="relative">
                    <Bell size={24} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-600 rounded-full" />
                </button>

                <div className="flex items-center gap-2">
                    <UserCircle size={35} />
                    <div className="hidden sm:block">
                        {/* FIX: dynamic email */}
                        {/* <h4 className="font-bold">
                            {user?.email || "—"}
                        </h4> */}

                        {/* FIX: dynamic role — capitalize karke dikhaya */}
                        <p className="text-sm text-center text-teal-500">
                            ( {user?.role ? user.role.toUpperCase() : "USER"} )
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;