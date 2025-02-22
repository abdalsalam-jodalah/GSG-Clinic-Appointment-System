import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpComponent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "", role: "doctor" });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Get existing users from localStorage or initialize empty array
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

        // Check if user already exists
        if (existingUsers.some((user: any) => user.username === formData.username)) {
            setError("Username already exists! Try another.");
            return;
        }

        // Save new user to localStorage
        const updatedUsers = [...existingUsers, formData];
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">Account created! Redirecting...</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="username"
                        type="text"
                        placeholder="Email"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="doctor">Doctor</option>
                        <option value="patient">Patient</option>
                    </select>
                    <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-4">
                    Already have an account? <a href="/login" className="text-blue-500">Login</a>
                </p>
            </div>
        </div>
    );
};

export default SignUpComponent;
