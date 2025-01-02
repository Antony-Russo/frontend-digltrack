import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        navigate('/login', { replace: true });
      };
    
      useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          navigate('/login', { replace: true });
        }
      }, [navigate]);

    const handleBranch = () => {
      navigate("/branches")
    };

    const handleHome = () => {
      navigate("/home")
    };

    const getActiveStyle = (path) => {
      return location.pathname === path ? { color: '#1881e1', fontWeight: 'bold' } : {};
    };

    return(
        <nav className='nav-container'>
        <div>
          <img src='/digitrac_short_logo.png' alt='logo' width={30}/>
          <img src='/digitrac_full_logo.png' alt='comapny-logo' width={100}/>
        </div>
        <ul className='nav-branch'>
          <li className='nav-list' onClick={handleHome} style={getActiveStyle('/home')}>Home</li>
          <li className='nav-list' onClick={handleBranch} style={getActiveStyle('/branches')}>Branch</li>
        </ul>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>
    );
};
export default NavBar;