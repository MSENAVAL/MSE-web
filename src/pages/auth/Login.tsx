import { useState } from "react";
import logo from "@/assets/MSE-logo-branca.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ButtonLoading from "@/components/ButtonLoading";
import { LoginResponseData, LoginResponseError } from "@/interfaces/authTypes";
import { useAuth } from "@/context/authContext";
import { Eye, EyeOff } from "react-feather";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("Admin02@teste.com");
    const [password, setPassword] = useState("T@ste1234");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const response: LoginResponseData | LoginResponseError = await login(email, password);
        setLoading(false);
        //console.log("response", response);

        if (!response.token) {
            if (response.message) {
                toast.error(response.message, {
                    position: "top-right",
                });
            } else {
                toast.error("Usuário ou senha inválidos", {
                    position: "top-right",
                });
            }
        }

        if (response.token && !response.aceitouTermosDeUso) {
            navigate("/terms", { state: { email, password } });
        } else if (response.token) {
            navigate("/users");
        }

        if (response.message) {
            toast.error(response.message, {
                position: "top-right",
            });
        }
    };

    if (forgotPassword) {
        return (
            <div className="grid h-screen grid-cols-1 bg-primary-blue md:grid-cols-2">
                <div className="flex flex-col items-center justify-center gap-24">
                    <div className="mb-8 flex items-center justify-center">
                        <img src={logo} alt="Logo" className="max-w-full md:min-w-[120%] lg:min-w-[130%]" />
                    </div>
                    <main className="flex w-full flex-col items-center justify-center">
                        <form className="flex w-80 max-w-[400px] flex-col gap-1 p-1 font-sans" onSubmit={handleLogin}>
                            <label className="text-white">E-mail</label>
                            <Input
                                type="text"
                                placeholder="email.email@gmail.com"
                                className="mb-4 h-12 rounded-full bg-white px-4 text-base"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {loading ? (
                                <ButtonLoading className="mt-0 h-12 rounded-full bg-secondary-red font-sans text-base font-bold hover:bg-secondary-red/80" />
                            ) : (
                                <Button
                                    className="mt-0 h-12 rounded-full bg-secondary-red font-sans text-base font-bold hover:bg-secondary-red/80"
                                    type="submit"
                                >
                                    Enviar e-mail
                                </Button>
                            )}

                            <div className="mt-4 flex justify-center px-1">
                                <span className=" text-sm text-white">Lembrou da senha?</span>
                                <span
                                    onClick={() => setForgotPassword(false)}
                                    className="ml-1 cursor-pointer text-sm font-bold text-white hover:underline"
                                >
                                    Faça seu login!
                                </span>
                            </div>
                        </form>
                    </main>
                </div>
                <div className="hidden bg-backgroundMse bg-cover bg-no-repeat md:block" />
            </div>
        );
    }

    return (
        <div className="grid h-screen grid-cols-1 bg-primary-blue md:grid-cols-2">
            <div className="flex flex-col items-center justify-center gap-24">
                <div className="mb-8 flex items-center justify-center">
                    <img src={logo} alt="Logo" className="max-w-full md:min-w-[120%] lg:min-w-[130%]" />
                </div>
                <main className="flex w-full flex-col items-center justify-center">
                    <form className="flex w-80 max-w-[400px] flex-col gap-1 p-1 font-sans" onSubmit={handleLogin}>
                        <label className="text-white">E-mail</label>
                        <Input
                            type="text"
                            placeholder="email.email@gmail.com"
                            className="mb-4 h-12 rounded-full bg-white px-4 text-base"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="mt-3 text-white">Senha</label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                aria-placeholder="*********"
                                placeholder="*********"
                                className="h-12 rounded-full bg-white px-4 pr-10 text-base"
                                style={
                                    showPassword && password.length === 0
                                        ? { fontSize: "2rem", paddingTop: "1.5rem" }
                                        : !showPassword && password.length === 0
                                          ? { fontSize: "2rem", paddingTop: "1.5rem" }
                                          : !showPassword && password.length > 0
                                            ? { fontSize: "2rem", paddingTop: "0.8rem" }
                                            : {}
                                }
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-2 flex h-full w-10 items-center justify-center text-gray-500"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>

                        <div className="mt-3 flex justify-between px-1">
                            <div className="flex items-center">
                                <Checkbox id="terms" className="custom-checkbox border-white" />
                                <span className="ml-2 text-sm text-white">Lembrar da senha</span>
                            </div>
                            <span onClick={() => setForgotPassword(true)} className="cursor-pointer text-sm text-white">
                                Esqueci a senha
                            </span>
                        </div>
                        {loading ? (
                            <ButtonLoading className="mt-8 h-12 rounded-full bg-secondary-red font-sans text-base font-bold hover:bg-secondary-red/80" />
                        ) : (
                            <Button
                                className="mt-8 h-12 rounded-full bg-secondary-red font-sans text-base font-bold hover:bg-secondary-red/80"
                                type="submit"
                            >
                                Entrar
                            </Button>
                        )}
                    </form>
                </main>
            </div>
            <div className="hidden bg-backgroundMse bg-cover bg-no-repeat md:block" />
        </div>
    );
};

export default Login;
