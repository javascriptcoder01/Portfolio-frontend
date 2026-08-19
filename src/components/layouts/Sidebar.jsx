// components/layout/Sidebar.jsx

import React, { useState } from "react";
import {
    ChevronDown,
    Circle,
    Home,
    LayoutDashboard,
    LogOutIcon,
    Menu,
    Settings,
    User,
    X,
    Briefcase,
    Code2,
    GraduationCap,
    Award,
    HeartHandshake,
    Languages,
    Lightbulb,
    FileText,
    Mic2,
    MessageSquareQuote,
    Wrench,
    Contact,
    Trophy,
    BookOpen,
    FileArchive,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutButton from "../common/LogoutButton";

const menuItems = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        url: "/",
    },

    // PROFILE
    {
        title: "Introduction",
        icon: Home,
        url: "/introduction",
    },
    {
        title: "About Me",
        icon: User,
        url: "/about",
    },
    {
        title: "Social & Contact",
        icon: Contact,
        url: "/contact",
    },

    // PROFESSIONAL
    {
        title: "Skills & Expertise",
        icon: Code2,
        url: "/skills",
    },
    {
        title: "Experience",
        icon: Briefcase,
        url: "/experience",
    },
    {
        title: "Projects / Work",
        icon: Wrench,
        url: "/projects",
    },
    {
        title: "Education",
        icon: GraduationCap,
        url: "/education",
    },

    // CREDENTIALS
    // {
    //     title: "Certifications",
    //     icon: Award,
    //     url: "/certifications",
    // },
    // {
    //     title: "Awards & Recognition",
    //     icon: Trophy,
    //     url: "/awards",
    // },

    // SERVICES & SOCIAL PROOF
    {
        title: "Services",
        icon: Lightbulb,
        url: "/services",
    },
    {
        title: "Testimonials",
        icon: MessageSquareQuote,
        url: "/testimonials",
    },

    // CONTENT
    // {
    //     title: "Publications & Articles",
    //     icon: BookOpen,
    //     url: "/publications",
    // },
    // {
    //     title: "Talks & Events",
    //     icon: Mic2,
    //     url: "/talks-events",
    // },
    // {
    //     title: "Volunteering",
    //     icon: HeartHandshake,
    //     url: "/volunteering",
    // },

    // PERSONAL
    {
        title: "Languages",
        icon: Languages,
        url: "/languages",
    },
    {
        title: "Interests & Hobbies",
        icon: Lightbulb,
        url: "/interests",
    },
    {
        title: "Resume",
        icon: FileArchive,
        url: "/resume",
    },

    // SETTINGS
    {
        title: "Settings",
        icon: Settings,
        children: [
            {
                title: "User Settings",
                icon: User,
                url: "/settings/user",
            },
            {
                title: "Profile Settings",
                icon: Circle,
                url: "/settings/profile",
            },
        ],
    },
];

const Sidebar = ({
    sidebarOpen,   // controls: FULL WIDTH (icon+text) vs ICON-ONLY (collapsed)
    setSidebarOpen,
    mobileOpen,    // controls: sidebar VISIBLE vs FULLY HIDDEN (mobile only)
    setMobileOpen,
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [openDropdown, setOpenDropdown] = useState(null);

    // HANDLE PARENT CLICK
    const handleParentClick = (item) => {
        if (item.children) {
            setOpenDropdown(openDropdown === item.title ? null : item.title);
        } else if (item.url) {
            navigate(item.url);
            setMobileOpen(false); // navigate hote hi mobile sidebar poori tarah hide ho jaye
        }
    };

    // HANDLE CHILD CLICK
    const handleChildClick = (url) => {
        navigate(url);
        setMobileOpen(false);
    };

    // TEXT sirf tab dikhega jab sidebarOpen = true (icon-only collapse control)
    const showText = sidebarOpen;

    return (
        <aside
            className={`
      fixed top-0 left-0 z-50 h-screen
      bg-amber-100 shadow-2xl transition-all duration-300
      flex flex-col
      ${sidebarOpen ? "w-72" : "w-20"}

      /* MOBILE: mobileOpen false -> poori sidebar (icon+text) screen se bahar */
      ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      /* DESKTOP: hamesha visible, sirf width collapse/expand hoti hai */
      lg:translate-x-0
    `}
        >
            {/* LOGO */}
            <div className="flex items-center justify-between p-4 border-b shrink-0">
                {showText && (
                    <h1 className="font-bold text-2xl text-indigo-600 whitespace-nowrap">
                        Sidebar
                    </h1>
                )}

                {/* TOGGLE BUTTON - icon-only <-> full width (mobile + desktop dono par kaam karega) */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className={`p-1 rounded-lg hover:bg-gray-100 shrink-0 ${!showText && "mx-auto"}`}
                >
                    {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* MENU - scrollable, takes remaining space */}
            <div className="p-4 overflow-y-auto flex-1">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isParentActive = location.pathname === item.url;

                    return (
                        <div key={index} className="mb-2">
                            {/* PARENT */}
                            <button
                                onClick={() => handleParentClick(item)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all
                                        ${!showText ? "justify-center" : "justify-between"}
                                        ${isParentActive
                                        ? "bg-indigo-100 text-indigo-600"
                                        : "hover:bg-indigo-50 hover:text-indigo-600"
                                    }`}
                            >
                                <div className={`flex items-center gap-3 ${!showText && "gap-0"}`}>
                                    <Icon size={20} className="shrink-0" />
                                    {showText && (
                                        <span className="font-medium whitespace-nowrap">
                                            {item.title}
                                        </span>
                                    )}
                                </div>

                                {item.children && showText && (
                                    <ChevronDown
                                        size={18}
                                        className={`transition-transform shrink-0
                                                ${openDropdown === item.title ? "rotate-180" : ""}`}
                                    />
                                )}
                            </button>

                            {/* CHILDREN */}
                            {item.children &&
                                openDropdown === item.title &&
                                showText && (
                                    <div className="ml-10 mt-2 space-y-2">
                                        {item.children.map((child, i) => {
                                            const isChildActive = location.pathname === child.url;

                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => handleChildClick(child.url)}
                                                    className={`block text-sm transition-all
                                                            ${isChildActive
                                                            ? "text-indigo-600 font-semibold"
                                                            : "text-gray-600 hover:text-indigo-600 hover:translate-x-1"
                                                        }`}
                                                >
                                                    {child.title}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                        </div>
                    );
                })}
            </div>

            {/* LOGOUT - fixed at bottom, icon left / text right */}
            <LogoutButton showText={showText} />
        </aside>
    );
};

export default Sidebar;