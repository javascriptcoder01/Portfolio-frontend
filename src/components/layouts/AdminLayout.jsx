import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        // ROOT WRAPPER - fixed to viewport height, no page-level scroll
        <div className="h-screen w-full overflow-hidden bg-gray-50 relative">

            {/* MOBILE OVERLAY */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* SIDEBAR SECTION */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            {/* MAIN SECTION - margin matches sidebar width exactly (w-72 = 18rem, w-20 = 5rem) */}
            <div
                className={`flex flex-col h-screen transition-all duration-300 ${sidebarOpen ? "lg:ml-[18rem]" : "lg:ml-[5rem]"
                    }`}
            >
                {/* FIXED HEADER */}
                <div className="shrink-0 sticky top-0 z-30">
                    <Header setMobileOpen={setMobileOpen} />
                </div>

                {/* ONLY CONTENT SCROLLABLE */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    <Outlet />
                </div>

                {/* FIXED FOOTER */}
                <div className="shrink-0 sticky bottom-0 z-30">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;