import React, { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

const DashboardLayout = ({ children }: React.PropsWithChildren<{}>) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="z-0 flex h-screen bg-primary-white">
            <div className="fixed left-0 top-0 h-24 w-full">
                <Header />
            </div>
            <div className="mt-16 flex w-full">
                <div className="fixed left-0 top-16 h-full">
                    <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
                </div>
                <div
                    className={`xs:${collapsed ? "ml-0" : "ml-20"} xs:mr-2 mb-8 ${collapsed ? "ml-20" : "ml-24"} mr-4 mt-16 flex-1 p-4            
                                md:${collapsed ? "ml-0" : "ml-20"} sm:mr-6
                                md:${collapsed ? "ml-0" : "ml-48"} md:mr-8
                                lg:${collapsed ? "ml-0" : "ml-48"} lg:mr-12
                                xl:${collapsed ? "ml-0" : "ml-52"} xl:mr-12`}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
