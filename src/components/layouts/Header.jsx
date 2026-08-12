import { Bell, Menu, UserCircle } from "lucide-react";

const Header = ({ setMobileOpen }) => {

    return (
        <header className="sticky top-0 z-30 bg-amber-100 shadow-sm flex items-center justify-between p-3">
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">
                <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
                    {/* Menu Icon with size*/}
                    <Menu size={26} />
                </button>

                <h2 className="text-2xl font-bold text-red-500">
                    Header
                </h2>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-5">
                <button className="relative">
                    {/* Bell Icon  */}
                    <Bell size={24} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-600 rounded-full">
                        {/* Badge */}
                    </span>
                </button>

                <div className="flex items-center gap-2">
                    {/* USER CIRCLE ICON */}
                    <UserCircle size={35} />
                    <div className="hidden sm:block">
                        <h4 className="font-bold">
                            NEERAJ SHARMA
                        </h4>

                        <p className="text-sm text-center text-teal-500">
                            ( ADMIN )
                        </p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;

// const Header = () => {
//     return (
//         <header>
//             <div className="text-2xl text-red-400">
//                 <h1>This is my Header</h1>
//             </div>
//         </header>

//     )
// }
// export default Header