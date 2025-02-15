import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/authProvider";
import { UserRole } from "../../../types/@user.ts";

interface IProps {
  children: React.ReactNode;
  roles: UserRole[];
}

const Guarded: React.FC<IProps> = ({ children, roles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
        <div>
          <h2>You must be logged in to see this screen!</h2>
          <Link to="/login">Login here</Link>
        </div>
    );
  }

  if (!roles.includes(user.role)) {
    return (
        <div>
          <h2>You don't have sufficient permissions to see this screen!</h2>
        </div>
    );
  }

  return <>{children}</>;
};

export default Guarded;
