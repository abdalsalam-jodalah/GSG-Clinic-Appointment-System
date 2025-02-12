/* eslint-disable no-constant-condition */

import { useContext } from "react"
import { AuthContext } from "../../providers/authProvider"

const Header = () => {
    const context = useContext(AuthContext);
  return (
    <div>
        <div>
            {context.user?.userName ? <div>
                {context.user.userName}
                <button onClick={context.logout}>Logout</button>
            </div> : "you need to login"
}
        </div>
    </div>
  )}


export default Header
