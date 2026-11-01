import React, { useContext } from 'react'
import { userAuthContext } from '../context/AuthContext';

const LogoutBtn = () => {
    const{logoutUser} = useContext(userAuthContext);
  return (
    <div>
        <button  onClick={logoutUser}
      className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 cursor-pointer transition duration-200 shadow-sm" >
      Log Out
    </button></div>
  )
}

export default LogoutBtn