import { DataTable } from "@/components/DataTable";
import { listShips } from "@/services/ships/shipService";
import { Ship } from "@/interfaces/ship";
import ShipIcon from "@/assets/ship-icon.svg";
import { DotIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SkeletonDataTable } from "@/components/SkeletonDataTable";
import { shipColumns } from "../_tables/shipColumns";

const Ships = () => {
    const navigate = useNavigate();
    const [ships, setShips] = useState<Ship[]>([]);
    const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchShips = async () => {
            setIsLoading(true);
            const ships: Ship[] = await listShips();

            if (ships) setShips(ships);

            setIsLoading(false);
        };

        if (ships.length === 0) fetchShips();
    }, []);

    const handleNewCustomer = () => {
        navigate("register");
    };

    const handleRowClick = (ship: Ship) => {
        setSelectedShip(ship);
        navigate(`/ships/${ship.id}`, { state: { ship } });
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1100);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mobileTable = (
        <div className="p-4">
            <div className="flex items-center justify-between">
                <h3 className="text-bold mb-4 items-center text-lg font-semibold text-primary-blue">Navios</h3>
                <div className="mb-4 flex items-center justify-end">
                    <Button
                        className="h-8 w-32 rounded-full bg-secondary-red font-sans text-xs font-bold shadow-md hover:bg-secondary-red/80"
                        onClick={handleNewCustomer}
                    >
                        <PlusIcon className="mr-1 h-5 w-5" />
                        Novo cadastro
                    </Button>
                </div>
            </div>
            <div className="overflow-auto">
                {ships.map((ship) => (
                    <div
                        key={ship.id}
                        className="mb-4 flex cursor-pointer items-center justify-between rounded-lg bg-white p-4 shadow-md transition-colors hover:bg-gray-100"
                        onClick={() => handleRowClick(ship)}
                    >
                        <div className="font-sans">
                            <p className="font-semibold">n° IMO</p>
                            <p className="text-gray-600">{ship.numeroIMO}</p>
                            <p className="font-semibold">Comprimento</p>
                            <p className="text-gray-600">{ship.loa} m</p>
                            <p className="font-semibold">Largura</p>
                            <p className="text-gray-600">{ship.b} m</p>
                            <p className="font-semibold">n° de Guindastes</p>
                            <p className="text-gray-600">0{ship.numeroGuindaste}</p>
                        </div>
                        <Badge
                            className={`flex w-20 items-center rounded-full bg-opacity-35 p-0 ${ship.status ? "hover:bg-#8EC742 hover:text-#365B03 bg-[#8EC742] text-[#365B03]" : "hover:bg-#FB101E hover:text-#790007 bg-[#FB101E] text-[#790007]"}`}
                        >
                            {ship.status ? <DotIcon className="h-6 w-6 p-0" /> : <DotIcon className="h-6 w-6 p-0" />}
                            {ship.status ? "Ativo" : "Inativo"}
                        </Badge>
                    </div>
                ))}
            </div>
        </div>
    );

    if (isMobile) {
        return mobileTable;
    }

    return (
        <>
            <h1 className="text-bold ml-8 text-xl font-semibold text-primary-blue">Navios</h1>

            <div className="m-4 grid h-[95%] grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
                <div className="col-span-3 m-4 mb-8 flex h-[90%] w-full flex-col rounded-2xl bg-[#F7F7F7]">
                    <div className="m-2 mx-8 mb-0 flex items-center justify-end lg:mt-8 xl:mt-8">
                        <Button
                            className="h-10 w-36 rounded-full bg-secondary-red font-sans text-xs font-bold shadow-md hover:bg-secondary-red/80"
                            onClick={handleNewCustomer}
                        >
                            <PlusIcon className="mr-1 h-5 w-5" />
                            Novo cadastro
                        </Button>
                    </div>
                    <div className="flex items-center justify-center px-8 pb-8">
                        <div className="w-full">
                            {isLoading ? (
                                <SkeletonDataTable />
                            ) : (
                                <DataTable
                                    columns={shipColumns}
                                    data={ships}
                                    rowIcon={ShipIcon}
                                    handleRowClick={handleRowClick}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-span-1 m-4 mb-8 ml-4 flex h-[90%] w-full flex-col rounded-2xl bg-[#F2F2FC] lg:ml-8 xl:ml-8">
                    <h3 className="mt-4 text-center text-lg font-semibold text-[#0A0A0A]">Suas notificações</h3>
                </div>
            </div>
        </>
    );
};

export default Ships;
