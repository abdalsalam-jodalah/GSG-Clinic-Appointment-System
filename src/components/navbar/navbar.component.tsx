import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/authProvider.tsx";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <div className="text-xl font-bold">
                <Link to="/">My Appointments</Link>
            </div>

            <div className="space-x-4 flex items-center">
                {user ? (
                    <>
                        {user.role === "patient" && (
                            <>
                                <Link to="/add">Book Appointment</Link>
                                <Link to="/user">My Appointments</Link>
                            </>
                        )}
                        {user.role === "doctor" && (
                            <>
                                <Link to="/dashboard">Dashboard</Link>
                                <Link to="/doctor">Manage Appointments</Link>
                            </>
                        )}
                        <span className="font-semibold">Hello, {user.name}!</span>
                        <button
                            onClick={logout}
                            className="bg-red-500 px-3 py-1 rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
