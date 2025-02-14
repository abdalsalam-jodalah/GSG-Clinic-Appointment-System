import "./App.css";
import Login from "./screens/login.screen.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./components/Form/form.component";
import Appointments from "./components/appointments/appointments.component";
import Navbar from "./components/navbar/navbar.component.tsx";
import NotFoundScreen from "./screens/not_found.screen.tsx";
import MyAppointmentsScreen from "./screens/my_appointemnts.screen.tsx";
import ManageAppoinntemntsScreen from "./screens/manage_appointemnts.screen.tsx";
import DashboardScreen from "./screens/dashbord.screen.tsx";
import FormScreen from "./screens/add_appointemnts.screen.tsx";
import LoginScreen from "./screens/login.screen.tsx";
import {ReactNode} from "react";
import Guarded from './components/common/guarded-route/guarded-route.component';
import { Role } from "./types/@role.ts"

function App() {
    const get_guarded_screen = (
        // roles:IRole,
        screen:ReactNode) => {
        return <Guarded 
        roles={[Role.ADMIN, Role.Teacher, Role.GUEST]}
        > {screen}</Guarded>
    }

  return (
    <>
        <Navbar/>
        <Router>
            <Routes>
                <Route path="/signup" element={get_guarded_screen(<LoginScreen/>)} />
                <Route path="/login" element={get_guarded_screen(<LoginScreen/>)} />
                <Route path="/" element={get_guarded_screen(<FormScreen />)} />
                <Route path="/" element={get_guarded_screen(<DashboardScreen />)} />
                <Route path="/doctor" element={get_guarded_screen(<ManageAppoinntemntsScreen />)} />
                <Route path="/mine" element={get_guarded_screen(<MyAppointmentsScreen />)} />
                <Route path='*' element={get_guarded_screen(<NotFoundScreen />)} />
            </Routes>
        </Router>
        <Navbar/>

    </>
  )
}
export default App;
