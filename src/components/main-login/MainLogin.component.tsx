import Header from '../Header/Header.component';
import Login from '../Form/Login.component';
import { AuthContext } from '../../providers/authProvider';
import { useContext } from "react";

const MainLogin = () => {
    const context = useContext(AuthContext);
    return (
      <>
        <Header />
        {context.user ? (
          context.user.role === "doctor" ? (
            "Welcome to Dashboard"
          ) : context.user.role === "patient" ? (
            "Welcome to Clinic Appointments"
          ) : null
        ) : (
          <Login />
        )}
      </>
    );
  }

export default MainLogin
