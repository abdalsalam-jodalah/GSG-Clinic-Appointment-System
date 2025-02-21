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
            {context.user?.name ? <div>
                {context.user.name}
                <button className="button" onClick={context.logout}>Logout</button>
            </div> : "you need to login"
}
        </div>
    </>
  )}


export default Header
