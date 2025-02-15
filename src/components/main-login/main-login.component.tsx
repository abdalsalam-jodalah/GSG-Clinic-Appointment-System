import Header from '../header/header.component.tsx';
import Login from '../form/login.component.tsx';
import { AuthContext } from '../../providers/authProvider';
import { useContext } from "react";
import './MainLogin.css';

const MainLogin = () => {
    const context = useContext(AuthContext);
    return (
      <div className="login-container">
        <Header />
        {context.user ? (
          context.user.role === "doctor" ? (
            "Welcome to DashboardComponent"
          ) : context.user.role === "patient" ? (
            "Welcome to Clinic Appointments"
          ) : null
        ) : (
          <Login />
        )}
      </div>
    );
  }

export default MainLogin
