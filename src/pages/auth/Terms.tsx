import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const Terms = () => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    const confirmTerms = () => {
        navigate("/users");
    };

    return (
        <div className="bg-primary-blue flex h-screen items-center justify-center">
            <div className="bg-primary-white over flex h-[75%] w-[75%] flex-col items-center overflow-auto rounded-3xl p-16">
                <h1 className="text-md text-center font-sans font-bold md:text-xl lg:text-2xl xl:text-2xl">
                    Termos e Condições de uso
                </h1>

                <div className="mt-8 flex h-full w-full justify-center overflow-auto">
                    <div className="mt-8 flex w-full justify-center text-justify">
                        <p className="xs:text-extra-small text-extra-small font-sans sm:w-[100%] sm:text-sm md:w-[90%] md:text-base lg:w-[70%] lg:text-lg xl:w-[60%] xl:text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem
                            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                            dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                    </div>
                </div>

                <div className="mt-2 flex flex-col items-center">
                    <div className="mt-4 flex items-center">
                        <Checkbox
                            id="terms"
                            className="border-primary-blue cursor-pointer rounded-none"
                            checked={checked}
                            onCheckedChange={() => setChecked(!checked)}
                        />
                        <span className="ml-2 font-sans text-sm text-gray-600">
                            Concordo com os termos e condições de uso
                        </span>
                    </div>

                    <Button
                        disabled={!checked}
                        className="bg-secondary-red hover:bg-secondary-red/80 mt-8 h-12 w-full rounded-full font-sans text-base font-bold"
                        onClick={confirmTerms}
                    >
                        Entrar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Terms;
