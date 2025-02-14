
export interface IUserData{
    userName : string;
    password : string;
    role : 'doctor' | 'patient';
}

export type UserRole = "patient" | "doctor";
export type UserGender = "male" | "female";
export interface IUser {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    gender: UserGender;
    age: number;
    contact: string;
}