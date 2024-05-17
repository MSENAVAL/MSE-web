import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DotIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ButtonLoading from "@/components/ButtonLoading";
import { Button } from "@/components/ui/button";
import ShipIcon from "@/assets/ship-icon.svg";
import { Badge } from "@/components/ui/badge";
import ModalDefault from "@/components/ModalDefault";
import { toast } from "react-toastify";
import { Ship } from "@/interfaces/ship";
import { deleteShip, updateShip } from "@/services/ships/shipService";

const UpdateShip = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const ship: Ship = location.state?.ship;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmDeleteShip, setConfirmDeleteShip] = useState(false);

    const [name, setName] = useState(ship.nome);
    const [numberIMO, setNumberIMO] = useState(ship.numeroIMO);
    const [loa, setLoa] = useState(ship.loa);
    const [b, setB] = useState(ship.b);
    const [numberCrane, setNumberCrane] = useState(ship.numeroGuindaste);
    const [typeOfVessel, setTypeOfVessel] = useState(ship.tipoEmbarcacao);
    const [loading, setLoading] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const validate = () => {
        // if (!name) {
        //     toast.error("Nome do navio é obrigatório", {
        //         position: "top-right",
        //     });
        //     return false;
        // }

        if (!numberIMO) {
            toast.error("Número IMO é obrigatório", {
                position: "top-right",
            });
            return false;
        }

        if (!loa) {
            toast.error("Você precisa informar o comprimento do navio: LOA (M)", {
                position: "top-right",
            });
            return false;
        }

        if (!b) {
            toast.error("Você precisa informar a largura do navio: B (M)", {
                position: "top-right",
            });
            return false;
        }

        if (!numberCrane) {
            toast.error("Número de guindastes é obrigatório", {
                position: "top-right",
            });
            return false;
        }

        if (!typeOfVessel) {
            toast.error("Tipo de embarcação é obrigatório", {
                position: "top-right",
            });
            return false;
        }

        return true;
    };

    const handleUpdateShip = async () => {
        if (!validate()) {
            handleCloseModal();
            return;
        }

        setLoading(true);

        const data = {
            id: ship.id,
            nome: name,
            numeroIMO: numberIMO,
            loa,
            b,
            numeroGuindaste: numberCrane,
            tipoEmbarcacao: typeOfVessel,
            status: ship.status,
        };

        try {
            const response = await updateShip(data);

            if (response) {
                toast.success("Navio atualizado com sucesso!", {
                    position: "top-right",
                });
                navigate("/ships");
            }
        } catch (error: Error | any) {
            console.log("error", error);
            toast.error(error.response.data, {
                position: "top-right",
            });
        } finally {
            setLoading(false);
            setIsModalOpen(false);
        }
    };

    const handleDeleteShip = async () => {
        setLoading(true);

        try {
            await deleteShip(ship.id);
            toast.success("Navio removido com sucesso", {
                position: "top-right",
            });
        } catch (error: Error | any) {
            console.log("error", error);
            toast.error(error.response.data, {
                position: "top-right",
            });
        } finally {
            setLoading(false);
            setConfirmDeleteShip(false);
            navigate("/ships");
        }
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mobileLayout = (
        <div className="m-4 flex flex-col items-center">
            <h1 className="text-bold text-xl font-semibold text-primary-blue">Dados do Navio</h1>
            <div className="mt-4 flex w-full flex-col rounded-2xl bg-[#F7F7F7] p-4">
                <label className="text-gray-500">Nome</label>
                <Input
                    type="text"
                    placeholder="Nome do navio"
                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label className="text-gray-500">nº IMO</label>
                <Input
                    type="text"
                    placeholder="000000"
                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                    value={numberIMO}
                    onChange={(e) => setNumberIMO(e.target.value)}
                />

                <label className="text-gray-500">LOA (M)</label>
                <Input
                    type="text"
                    placeholder="Comprimento"
                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                    value={loa}
                    onChange={(e) => setLoa(e.target.value)}
                />

                <label className="text-gray-500">B (M)</label>
                <Input
                    type="text"
                    placeholder="Largura"
                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                />

                <label className="text-gray-500">nº de Guindastes</label>
                <Input
                    type="text"
                    placeholder="00"
                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                    value={numberCrane}
                    onChange={(e) => setNumberCrane(e.target.value)}
                />

                <label className="text-gray-500">Tipo de embarcação</label>
                <Input
                    type="text"
                    placeholder="Ex: Navio Graneleiro"
                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                    value={typeOfVessel}
                    onChange={(e) => setTypeOfVessel(e.target.value)}
                />

                <div className="mt-4 flex w-full flex-col items-center justify-center sm:flex-row">
                    <Button
                        className="mb-4 h-12 w-full rounded-full border border-secondary-red bg-white font-sans text-base font-bold text-primary hover:bg-secondary-red/80 sm:mb-0 md:mr-4"
                        onClick={() => setConfirmDeleteShip(true)}
                    >
                        Excluir navio
                    </Button>

                    <Button
                        className="mb-4 h-12 w-full rounded-full bg-secondary-red font-sans text-base font-bold hover:bg-secondary-red/80 sm:mb-0 md:mr-4"
                        onClick={() => navigate("/ships")}
                    >
                        Cancelar
                    </Button>

                    {loading ? (
                        <ButtonLoading className="h-12 w-full rounded-full bg-primary-blue font-sans text-base font-bold hover:bg-primary-blue/80" />
                    ) : (
                        <Button
                            className="h-12 w-full rounded-full bg-primary-blue font-sans text-base font-bold hover:bg-primary-blue/80"
                            onClick={handleOpenModal}
                        >
                            Confirmar
                        </Button>
                    )}
                </div>
            </div>

            <ModalDefault
                loading={loading}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleUpdateShip}
                title="Você finalizou a edição deste navio?"
                mobile
            />

            <ModalDefault
                loading={loading}
                isOpen={confirmDeleteShip}
                onClose={() => setConfirmDeleteShip(false)}
                onConfirm={handleDeleteShip}
                title="Tem certeza que deseja excluir este navio?"
                mobile
            />
        </div>
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
                            <img src={ShipIcon} alt="Ship Icon" className="h-16 w-16" />
                            <div className="ml-4 md:w-1/2 xl:w-1/3">
                                <label className="ml-2 text-gray-500">Nome</label>
                                <Input
                                    type="text"
                                    placeholder="Nome do navio"
                                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="xl:w-1/3" />
                            <div className="md:w-1/2 xl:w-1/3">
                                <label className="ml-2 text-gray-500">nº IMO</label>
                                <Input
                                    type="text"
                                    placeholder="000000"
                                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                                    value={numberIMO}
                                    onChange={(e) => setNumberIMO(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4 ml-20 flex flex-col md:flex-row md:items-center">
                            <div className="md:w-1/2 xl:w-1/3">
                                <label className="ml-2 text-gray-500">LOA (M)</label>
                                <Input
                                    type="text"
                                    placeholder="Comprimento"
                                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                                    value={loa}
                                    onChange={(e) => setLoa(e.target.value)}
                                />
                            </div>
                            <div className="xl:w-1/3" />
                            <div className="md:w-1/2 xl:w-1/3">
                                <label className="ml-2 text-gray-500">B (M)</label>
                                <Input
                                    type="text"
                                    placeholder="Largura"
                                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                                    value={b}
                                    onChange={(e) => setB(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4 ml-20 flex flex-col md:flex-row md:items-center">
                            <div className="md:w-1/2 xl:w-1/3">
                                <label className="ml-2 text-gray-500">nº de Guindastes</label>
                                <Input
                                    type="text"
                                    placeholder="00"
                                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                                    value={numberCrane}
                                    onChange={(e) => setNumberCrane(e.target.value)}
                                />
                            </div>
                            <div className="md:w-1/2 xl:w-1/3" />
                            <div className="md:w-1/2 xl:w-1/3">
                                <label className="ml-2 text-gray-500">Tipo de embarcação</label>
                                <Input
                                    type="text"
                                    placeholder="Ex: Navio Graneleiro"
                                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                                    value={typeOfVessel}
                                    onChange={(e) => setTypeOfVessel(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4 ml-20 flex flex-col md:flex-row md:items-center">
                            <div className="md:w-1/2 xl:w-1/3" />
                            <div className="md:w-1/2 xl:w-1/3" />
                            <div className="md:w-1/2 xl:w-1/3">
                                <Button
                                    className="mb-4 h-10 w-48 rounded-full bg-secondary-red font-sans text-base font-bold hover:bg-secondary-red/80 sm:mb-0 md:mr-4"
                                    onClick={() => setConfirmDeleteShip(true)}
                                >
                                    Excluir navio
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-4 flex w-[90%] flex-col items-center justify-center sm:flex-row xl:mr-16">
                    <Button
                        className="mb-4 h-12 w-48 rounded-full bg-secondary-red font-sans text-base font-bold hover:bg-secondary-red/80 sm:mb-0 md:mr-4"
                        onClick={() => navigate("/ships")}
                    >
                        Cancelar
                    </Button>

                    {loading ? (
                        <ButtonLoading className="h-12 w-48 rounded-full bg-primary-blue font-sans text-base font-bold hover:bg-primary-blue/80" />
                    ) : (
                        <Button
                            className=" h-12 w-48 rounded-full bg-primary-blue font-sans text-base font-bold hover:bg-primary-blue/80 "
                            onClick={handleOpenModal}
                        >
                            Confirmar
                        </Button>
                    )}
                </div>
            </div>

            <ModalDefault
                loading={loading}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleUpdateShip}
                title="Você finalizou a edição deste navio?"
            />

            <ModalDefault
                loading={loading}
                isOpen={confirmDeleteShip}
                onConfirm={handleDeleteShip}
                onClose={() => setConfirmDeleteShip(false)}
                title="Tem certeza que deseja excluir este navio?"
            />
        </>
    );
};

export default UpdateShip;
