import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ReactNode } from "react";
import { UserRole } from "./types/@user.ts";

import LoginScreen from "./screens/login.screen.tsx";
import DashboardScreen from "./screens/dashbord.screen.tsx";
import MyAppointmentsScreen from "./screens/my_appointemnts.screen.tsx";
import ManageAppointmentsScreen from "./screens/manage_appointemnts.screen.tsx";
import FormScreen from "./screens/add_appointemnts.screen.tsx";
import NotFoundScreen from "./screens/not_found.screen.tsx";

import Navbar from "./components/navbar/navbar.component.tsx";
import Footer from "./components/footer/footer.component.tsx";
import Guarded from "./components/common/guarded-route/guarded-route.component";

function App() {
    const get_guarded_screen = (roles: UserRole[], screen: ReactNode) => {
        return <Guarded roles={roles}>{screen}</Guarded>;
    };
    return (
        <>
            <Navbar />
            <Router>
                <Routes>
                    <Route path="/" element={<LoginScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/signup" element={<LoginScreen />} />

                    <Route path="/add" element={get_guarded_screen(["patient"], <FormScreen />)} />
                    <Route path="/user" element={get_guarded_screen(["patient"], <MyAppointmentsScreen />)} />
                    
                    <Route path="/dashboard" element={get_guarded_screen(["doctor"], <DashboardScreen />)} />
                    <Route path="/doctor" element={get_guarded_screen(["doctor"], <ManageAppointmentsScreen />)} />

                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </Router>
            <Footer />
        </>
    );
}
export default App;
