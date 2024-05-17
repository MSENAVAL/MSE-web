import { useState, useEffect } from "react";
import ShipIcon from "@/assets/ship-icon.svg";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/ButtonLoading";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ModalDefault from "@/components/ModalDefault";
import { toast } from "react-toastify";
import { createShip } from "@/services/ships/shipService";

const NewShip = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [numberIMO, setNumberIMO] = useState("");
    const [loa, setLoa] = useState("");
    const [b, setB] = useState("");
    const [numberCrane, setNumberCrane] = useState("");
    const [typeOfVessel, setTypeOfVessel] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const validate = () => {
        if (!name) {
            toast.error("Nome do navio é obrigatório", {
                position: "top-right",
            });
            return false;
        }

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

    const handleShipRegister = async () => {
        if (!validate()) {
            handleCloseModal();
            return;
        }

        setLoading(true);

        const data = {
            id: 0,
            nome: name,
            numeroIMO: numberIMO,
            loa,
            b,
            numeroGuindaste: numberCrane,
            tipoEmbarcacao: typeOfVessel,
            status: true,
        };

        try {
            const response = await createShip(data);

            if (response === "Navio cadastrado com sucesso!") {
                toast.success("Navio cadastrado com sucesso!", {
                    position: "top-right",
                });
                navigate("/ships");
            }

            if (response.mensagem) {
                toast.error(response.mensagem, {
                    position: "top-right",
                });
            }
        } catch (error: Error | any) {
            console.log("error", error);
            toast.error(error.mensagem, {
                position: "top-right",
            });
        } finally {
            setLoading(false);
            handleCloseModal();
        }
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mobileLayout = (
        <>
            <div className="m-4 flex flex-col items-center">
                <h1 className="text-bold text-xl font-semibold text-primary-blue">Cadastro de Navio</h1>
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
                            className="mb-4 h-12 w-full rounded-full bg-secondary-red font-sans text-base font-bold hover:bg-secondary-red/80 sm:mb-0 md:mr-4"
                            onClick={() => navigate("/users")}
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
                                Cadastrar
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <ModalDefault
                loading={loading}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleShipRegister}
                title="Você finalizou o cadastro do navio?"
                mobile={true}
            />
        </>
    );

    if (isMobile) {
        return mobileLayout;
    }

    return (
        <>
            <h1 className="text-bold ml-16 text-xl font-semibold text-primary-blue">Cadastro de Navio</h1>
            <div className="m-4 mb-0 ml-16 flex h-[95%] w-[95%] flex-col rounded-2xl sm:h-[90%] md:overflow-auto xl:mr-16">
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
                            <div className="xl:w-1/3" />
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
                            Cadastrar
                        </Button>
                    )}
                </div>
            </div>

            <ModalDefault
                loading={loading}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleShipRegister}
                title="Você finalizou o cadastro do navio?"
            />
        </>
    );
};

export default NewShip;
