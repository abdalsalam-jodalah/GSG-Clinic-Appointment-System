/* eslint-disable no-constant-condition */

import { useContext } from "react"
import { AuthContext } from "../../providers/authProvider"
import './Header.css'

const Header = () => {
    const context = useContext(AuthContext);
  return (
    //
    <>
        <div className="title-login">
            {context.user?.userName ? <div>
                {context.user.userName}
                <button onClick={context.logout}>Logout</button>
            </div> : "you need to login"
}
        </div>
    </>
  )}


export default Header
