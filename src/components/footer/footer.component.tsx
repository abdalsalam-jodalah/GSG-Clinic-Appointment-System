import  { useContext } from "react";
import { AuthContext } from "../../providers/authProvider.tsx";
import { Link } from "react-router-dom";

const Footer = () => {
  const { user } = useContext(AuthContext);

  return (
      <footer className="bg-gray-900 text-white p-6 mt-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
=          <div className="flex flex-col md:flex-row items-center gap-4">
            <h2 className="text-lg font-bold">Appointment System</h2>
            <nav className="flex gap-4">
              <Link to="/" className="hover:text-gray-400">Home</Link>
              <Link to="/about" className="hover:text-gray-400">About</Link>
              <Link to="/contact" className="hover:text-gray-400">Contact</Link>
            </nav>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            {user ? (
                <p className="text-sm">
                  Logged in as <span className="font-semibold">{user.name}</span>
                </p>
            ) : (
                <Link to="/login" className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600">
                  Login
                </Link>
            )}

            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                🔵
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                🟦
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                🔗
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm text-gray-500 mt-4">
          &copy; {new Date().getFullYear()} Appointment System. All rights reserved.
        </div>
      </footer>
  );
};

export default Footer;
