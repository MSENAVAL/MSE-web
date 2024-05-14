import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/authContext";
import AppRoutes from "./routes";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ToastContainer />
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
