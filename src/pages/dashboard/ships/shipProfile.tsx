import { useState, useEffect } from "react";
import UserIcon from "@/assets/user-icon.svg";
import { DotIcon } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Edit } from "react-feather";
import { cnpjMask } from "@/utils/masks";
import { Ship } from "@/interfaces/ship";

const ShipProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const ship: Ship = location.state?.ship;

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleUpdateCustomer = () => {
        navigate(`/ships/${id}/update`, { state: { ship } });
    };

    const mobileLayout = (
        <>
            <h1 className="text-bold ml-6 text-xl font-semibold text-primary-blue">Dados do Navio</h1>
            <div className="m-4 mb-0 flex h-[95%] w-[95%] flex-col rounded-2xl sm:h-[90%] md:overflow-auto xl:mr-16">
                <div className="xs:h-[90%] col-span-4 mb-8 flex h-[90%] w-[90%] flex-col rounded-2xl bg-[#F7F7F7] pr-0 sm:h-[90%] md:overflow-auto lg:pr-0 xl:h-[80%] xl:pr-24">
                    <div className="flex w-full flex-col p-8">
                        <div className="mb-4 flex flex-row items-center">
                            <img src={UserIcon} alt="User Icon" className="h-16 w-16" />
                            <div className="ml-4 w-full">
                                <div className="flex flex-row items-center justify-between">
                                    <label className="ml-2 text-sm text-gray-500">Nome</label>
                                    <button
                                        className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-secondary-red hover:bg-secondary-red/80"
                                        onClick={handleUpdateCustomer}
                                    >
                                        <Edit className="h-4 w-4 text-white" />
                                    </button>
                                </div>
                                <h2 className="ml-2 mt-[-6px]">{ship.nome}</h2>
                            </div>
                        </div>
                        <div className="mb-4 ml-20 mt-2 flex flex-col md:flex-row md:items-start md:justify-between">
                            <div className="flex flex-col md:w-1/3">
                                <label className="ml-2 text-sm text-gray-500">n° IMO</label>
                                <span className="ml-2 text-sm">{ship.numeroIMO}</span>
                            </div>
                            <div className="mt-4 flex flex-col md:w-1/3">
                                <label className="ml-2 text-sm text-gray-500">LOA (M)</label>
                                <span className="ml-2 text-sm">{ship.loa}</span>
                            </div>
                            <div className="mt-4 flex flex-col md:w-1/3">
                                <label className="ml-2 text-sm text-gray-500">B (M)</label>
                                <span className="ml-2 text-sm">{ship.b}</span>
                            </div>
                            <div className="mt-4 flex flex-col md:w-1/3">
                                <label className="ml-2 text-sm text-gray-500">nº de Guindastes</label>
                                <span className="ml-2 text-sm">{ship.numeroGuindaste}</span>
                            </div>
                            <div className="mt-4 flex flex-col md:w-1/3">
                                <label className="ml-2 text-sm text-gray-500">Tipo de embarcação</label>
                                <span className="ml-2 text-xs uppercase">{ship.tipoEmbarcacao}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    if (isMobile) {
        return mobileLayout;
    }

    return (
        <>
            <h1 className="text-bold ml-8 text-xl font-semibold text-primary-blue">Dados do Navio</h1>
            <div className="m-4 mb-0 ml-8 flex h-[95%] w-[95%] flex-col rounded-2xl sm:h-[90%] md:overflow-auto xl:mr-16">
                <div className="xs:h-[90%] col-span-4 mb-8 flex h-[90%] w-[90%] flex-col rounded-2xl bg-[#F7F7F7] pr-0 sm:h-[90%] md:overflow-auto lg:pr-0 xl:h-[80%] xl:pr-24">
                    <div className="flex w-full flex-col p-8">
                        <div className="mb-4 flex flex-row items-center">
                            <img src={UserIcon} alt="User Icon" className="h-16 w-16" />
                            <div className="ml-4 w-full">
                                <div className="flex flex-row items-center justify-between">
                                    <label className="ml-2 text-sm text-gray-500">Nome</label>
                                    <button
                                        className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-secondary-red hover:bg-secondary-red/80"
                                        onClick={handleUpdateCustomer}
                                    >
                                        <Edit className="h-4 w-4 text-white" color="#FFF" />
                                    </button>
                                </div>
                                <h2 className="ml-2 mt-[-6px]">{ship.nome}</h2>
                            </div>
                        </div>
                        <div className="mb-4 ml-20 mt-2 flex flex-col md:flex-row md:items-start md:justify-between">
                            <div className="flex flex-col md:w-1/3">
                                <label className="ml-2 text-sm text-gray-500">n° IMO</label>
                                <span className="ml-2">{ship.numeroIMO}</span>
                            </div>
                            <div className="flex flex-col md:w-1/3">
                                <label className="ml-2 text-sm text-gray-500">LOA (M)</label>
                                <span className="ml-2">{ship.loa}</span>
                            </div>
                            <div className="flex flex-col md:w-1/3">
                                <label className="ml-2 text-sm text-gray-500">B(M)</label>
                                <span className="ml-2">{ship.b}</span>
                            </div>
                        </div>
                        <div className="mb-4 ml-20 mt-4 flex flex-col md:flex-row md:items-start md:justify-between">
                            <div className="flex flex-col md:w-1/3">
                                <label className="ml-2 text-sm text-gray-500">nº de Guindastes</label>
                                <span className="ml-2">{ship.numeroGuindaste}</span>
                            </div>
                            <div className="flex flex-col md:w-1/3">
                                <label className="ml-2 text-sm text-gray-500">Tipo de embarcação</label>
                                <span className="ml-2 text-sm uppercase">{ship.tipoEmbarcacao}</span>
                            </div>
                            <div className="flex flex-col md:w-1/3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShipProfile;
