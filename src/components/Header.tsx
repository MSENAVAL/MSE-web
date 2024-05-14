import logo from "@/assets/MSE-logo-colorida.svg";
import UserIcon from "@/assets/user-icon.png";
import { useEffect, useState } from "react";
import { Bell } from "react-feather";

const Header = () => {
    const [animation, setAnimation] = useState(true);
    const [notification, setNotification] = useState(true);
    const [size, setSize] = useState(32);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setAnimation(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
        const handleResizeImages = () => {
            if (window.innerWidth <= 768) {
                setSize(24);
            } else {
                setSize(32);
            }
        };

        window.addEventListener("resize", handleResizeImages);

        return () => window.removeEventListener("resize", handleResizeImages);
    }, []);

    const handleClickBell = () => {};

    const handleClickUser = () => {};

    return (
        <header className="flex h-24 w-full flex-row items-center justify-between px-8 py-4">
            <div>
                <img src={logo} alt="MSE Logo" />
            </div>
            <div className="flex flex-row items-center gap-6">
                <div
                    className={`relative cursor-pointer ${animation ? "animate-bounce" : ""}`}
                    onClick={handleClickBell}
                >
                    <Bell size={size} color="#001D35" />
                    {notification && <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-red-500"></div>}
                </div>

                <img
                    src={UserIcon}
                    alt="User Icon"
                    width={size + 4}
                    className="cursor-pointer rounded-full"
                    onClick={handleClickUser}
                />
            </div>
        </header>
    );
};

export default Header;
