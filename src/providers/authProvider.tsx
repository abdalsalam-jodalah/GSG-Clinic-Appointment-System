import { createContext, useEffect, useState } from "react";
import { IUser } from "../types/@user"; // Import the IUser interface

interface IAuthContext {
    user: IUser | null;
    login: (data: IUser) => void;
    logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = (props: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser)); // Parse and set user data
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
                localStorage.removeItem("user"); // Clean up invalid data
            }
        }
    }, []);

    const login = (data: IUser) => {
        // if (!data || !data.email || data.email.length < 3) {
        //     setUser(null);
        //     return;
        // }
        console.log(data);
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const value = { user, login, logout };

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    );
};
