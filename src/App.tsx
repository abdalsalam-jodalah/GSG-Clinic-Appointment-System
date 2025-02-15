import "./App.css";
import { Route, Routes } from "react-router-dom";
import { UserRole } from "./types/@user";

import { useContext } from "react";
import { AuthContext } from "./providers/authProvider.tsx";

import LoginScreen from "./screens/login.screen";
import DashboardScreen from "./screens/dashbord.screen";
import MyAppointmentsScreen from "./screens/my-appointments.screen.tsx";
import ManageAppointmentsScreen from "./screens/manage-appointments.screen.tsx";
import FormScreen from "./screens/add-appointments.screen.tsx";
import NotFoundScreen from "./screens/not-found.screen.tsx";

import Navbar from "./components/navbar/navbar.component";
import Footer from "./components/footer/footer.component";
import Guarded from "./components/common/guarded-route/guarded-route.component";
import SignUpComponent from "./components/sign-up/sign-up.component.tsx";

function App() {
    const { user } = useContext(AuthContext);

    const get_guarded_screen = (roles: UserRole[], screen: React.ReactNode) => {
        return <Guarded roles={roles}>{screen}</Guarded>;
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<LoginScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/signup" element={<SignUpComponent />} />

                    {user && (
                        <>
                            {user.role === "patient" && (
                                <>
                                    <Route path="/add" element={get_guarded_screen(["patient"], <FormScreen />)} />
                                    <Route path="/user" element={get_guarded_screen(["patient"], <MyAppointmentsScreen />)} />
                                </>
                            )}

                            {user.role === "doctor" && (
                                <>
                                    <Route path="/dashboard" element={get_guarded_screen(["doctor"], <DashboardScreen />)} />
                                    <Route path="/doctor" element={get_guarded_screen(["doctor"], <ManageAppointmentsScreen />)} />
                                </>
                            )}
                        </>
                    )}

                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}


export default App;
