import { useState, useEffect } from "react";
import { UserPlus, FileText, LogOut, ChevronLeft, ChevronRight } from "react-feather";
import { Building, Ship } from "lucide-react";
import { useAuth } from "@/context/authContext";

interface NavItemProps {
    icon: JSX.Element;
    label?: string;
    onClick?: () => void;
}

const NavItem = ({ icon, label, onClick }: NavItemProps) => {
    return (
        <div
            onClick={onClick}
            className="flex cursor-pointer items-center px-4 py-4 hover:w-[95%] hover:rounded-r-full hover:border-l-4 hover:border-l-secondary-red hover:bg-white hover:text-secondary-red"
        >
            {icon}
            <div className="ml-2">{label}</div>
        </div>
    );
};

const NavItemCollapsed = ({ icon, onClick }: NavItemProps) => {
    return (
        <div
            onClick={onClick}
            className="flex cursor-pointer items-center px-4 py-4 hover:rounded-full hover:bg-white hover:text-secondary-red"
        >
            {icon}
        </div>
    );
};

const NavbarToggle = ({ collapsed, onClick }: { collapsed: boolean; onClick: () => void }) => {
    return (
        <div
            className="absolute right-[-10px] top-2 z-10 cursor-pointer rounded-full border bg-white shadow-md transition-all duration-500"
            onClick={onClick}
        >
            {collapsed ? <ChevronRight size={24} color="#001D35" /> : <ChevronLeft size={24} color="#001D35" />}
        </div>
    );
};

const Navbar = ({
    collapsed,
    setCollapsed,
}: {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { logout } = useAuth();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div
            className={`fixed left-1 top-32 h-96 rounded-2xl bg-primary-blue text-white transition-all duration-300 ${collapsed ? "w-16" : "w-[170px]"}`}
        >
            <NavbarToggle collapsed={collapsed} onClick={toggleCollapse} />
            {!collapsed ? (
                <div className="mt-8 py-8">
                    <NavItem icon={<UserPlus size={20} />} label="Cadastros" />
                    <NavItem icon={<Building size={20} />} label="Clientes" />
                    <NavItem icon={<FileText size={20} />} label="Relatórios" />
                    <NavItem icon={<Ship size={20} />} label="Navios" />
                    <NavItem icon={<LogOut size={20} />} label="Sair" onClick={handleLogout} />
                </div>
            ) : (
                <div className="mt-8 flex w-full flex-col items-center justify-center py-8">
                    <NavItemCollapsed icon={<UserPlus size={20} />} />
                    <NavItemCollapsed icon={<Building size={20} />} />
                    <NavItemCollapsed icon={<FileText size={20} />} />
                    <NavItemCollapsed icon={<Ship size={20} />} />
                    <NavItemCollapsed icon={<LogOut size={20} />} onClick={handleLogout} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
