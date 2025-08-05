import React, { useEffect } from 'react'
import { logout } from '../../Services/userServices';

const Logout = () => {
    useEffect(() => {
        logout();
        window.location = "/"; // Redirect to home page after logout
    }
    , []);
  return null;
}

export default Logout
