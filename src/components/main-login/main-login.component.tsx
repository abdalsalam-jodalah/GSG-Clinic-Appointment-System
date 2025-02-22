import { AuthContext } from '../../providers/authProvider';
import { useContext } from "react";
import './MainLogin.css';
import Header from '../Header/Header.component';
import Login from '../Form/Login.component';
import MyAppointmentsScreen from '../../screens/my-appointments.screen';
import DashboardScreen from '../../screens/dashbord.screen';

const MainLogin = () => {
    const context = useContext(AuthContext);
    return (
      <div className="login-container">
        <Header />
        {context.user ? (
          context.user.role === "doctor" ? (
            <DashboardScreen/>
          ) : context.user.role === "patient" ? (
            <MyAppointmentsScreen/>
          ) : null
        ) : (
          <Login />
        )}
      </div>
    );
  }

export default MainLogin
