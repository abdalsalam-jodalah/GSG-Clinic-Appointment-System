import { useContext } from "react";
import { AuthContext } from "../../providers/authProvider";
import './Login.css';


const Login = () => {
  const {login} = useContext(AuthContext);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    //send api request to validate data and get token from backend

    const userName = e.currentTarget['username'].value;
    const password = e.currentTarget['password'].value;
    const role = (e.currentTarget['role'] as any).value;
    console.log(userName, password, role);
    if(userName === "admin@app.com" && password === '1234' && role === 'doctor'){
      login({userName, password, role});
    }
    if(role === 'patient'){
      login({userName, password, role});
    }
  }
  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <input id="username" type="text" placeholder="Email" required/>
        <input id="password" type="password" placeholder="Password" />
        <div>
          <select name="role">
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
