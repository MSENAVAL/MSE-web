import { useState } from "react";
import Cookies from "js-cookie";
import { Button } from "./ui/button";
import cookie from "@/assets/cookie.svg";

interface ModalCookiesProps {
    isOpen: boolean;
    mobile?: boolean;
}

const ModalCookies = ({ isOpen, mobile = false }: ModalCookiesProps) => {
    const [open, setIsOpen] = useState(isOpen);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleAccept = () => {
        Cookies.set("cookieConsent", "accepted", { expires: 365 });
        setIsOpen(false);

        if (typeof window !== "undefined") {
            window.location.reload();
        }
    };

    if (!open && !isOpen) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full bg-[#001D35] shadow-lg">
            <div className="flex:row mx-auto flex max-w-4xl flex-row justify-center">
                <div className="flex:col mx-auto flex flex-col items-start px-4 pb-16">
                    <img src={cookie} alt="Cookie" className="h-36 w-36" />
                </div>
                <div className="flex:col mx-auto flex max-w-4xl flex-col justify-center p-4">
                    <p className="xs:text-xs text-left text-sm text-white">
                        Nosso website coleta informações do seu dispositivo e da sua navegação por meio de cookies para
                        transmitir funcionalidades, como melhorar o funcionamento técnico das páginas e mensurar a
                        audiência do website. Para obter mais informações sobre como isso é feito, acesse nossa{" "}
                        <span className="font-bold text-[#7C82FF]">Política de Cookies</span>.
                    </p>
                    <p className="xs:text-xs mt-4 text-left text-sm text-white">
                        Ao clicar em ACEITO, você concordará com os termos da nossa{" "}
                        <span className="font-bold text-[#7C82FF]">Política de Privacidade</span>.
                    </p>
                    <div className={`mt-4 flex w-full justify-center`}>
                        <Button
                            className="h-8 w-24 rounded-full border border-secondary-red bg-white font-sans text-xs font-bold text-secondary-red hover:bg-secondary-red/30 sm:mb-0 md:mr-4"
                            onClick={handleClose}
                            variant={"secondary"}
                        >
                            Recusar
                        </Button>
                        <Button
                            className="h-8 w-24 rounded-full bg-secondary-red font-sans text-xs font-bold hover:bg-secondary-red/80 sm:mb-0 md:mr-4"
                            onClick={handleAccept}
                        >
                            Aceitar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCookies;
