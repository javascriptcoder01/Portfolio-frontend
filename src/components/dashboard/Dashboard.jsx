import React from "react";
import {
    User,
    Briefcase,
    FolderKanban,
    Award,
    GraduationCap,
    MessageSquare,
} from "lucide-react";
import PageContainer from "../layouts/PageContainer";



const Dashboard = () => {

    const stats = [
        {
            title: "Profile",
            value: "Active",
            icon: User,
        },
        {
            title: "Experience",
            value: "0",
            icon: Briefcase,
        },
        {
            title: "Projects",
            value: "0",
            icon: FolderKanban,
        },
        {
            title: "Education",
            value: "0",
            icon: GraduationCap,
        },
        {
            title: "Awards",
            value: "0",
            icon: Award,
        },
        {
            title: "Testimonials",
            value: "0",
            icon: MessageSquare,
        },
    ];

    return (
        <PageContainer title="Dashboard">

            <p className="text-gray-500 mb-6">
                Manage your portfolio content.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {stats.map((item) => {

                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        {item.title}
                                    </p>

                                    <h2 className="text-2xl font-bold mt-2">
                                        {item.value}
                                    </h2>
                                </div>

                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                    <Icon size={22} />
                                </div>

                            </div>
                        </div>
                    );
                })}

            </div>

        </PageContainer>
    );
};

export default Dashboard;