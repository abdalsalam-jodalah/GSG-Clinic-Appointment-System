import { useContext } from "react";
import "./App.css";
import Login from "./components/Form/Login.component";
import Header from "./components/Header/Header.component";
import { AuthContext } from "./providers/authProvider";

function App() {
  const context = useContext(AuthContext);
  return (
    <>
      {/* <h1 className='text-7xl text-center text-blue-400'>Hello world</h1> */}
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

export default App;
