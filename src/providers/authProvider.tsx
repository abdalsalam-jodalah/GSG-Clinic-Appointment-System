import { createContext, useEffect, useState } from "react";
import { IUserData } from "../types/types";

interface IAuthContext{
    user: IUserData | null; 
    login: (data: IUserData) => void; 
    logout: () => void; 
}
export const AuthContext = createContext<IAuthContext>({user : null, login : () => { }, logout : () => { } });

export const AuthProvider = (props : {children : React.ReactNode}) =>{
    const [user, setUser] = useState<IUserData | null>(null);
    // Retrieve user from localStorage on page refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse and set user data
        }
    }, []);
    const login = (data : IUserData) =>{
        if(data.userName.length >= 3){
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
        }else{
            setUser(null);
        }
    }
    const logout = () =>{
        setUser(null);
        localStorage.removeItem('user');
    }
    
    const value = {user, login, logout};

    return(
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}