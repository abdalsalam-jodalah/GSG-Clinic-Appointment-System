import { useContext } from "react";
import { AuthContext } from "../providers/authProvider";
import { IUser } from "../types/@user"; // Import the IUser interface

export const useAuth = () => {
    const { user, login, logout } = useContext(AuthContext);

    const setAuth = (newUser: IUser) => {
        login(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    return { user, setAuth, login, logout };
};
