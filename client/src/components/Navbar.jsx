import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/void-map-icon.png'; 
import Button from './Button';

function Navbar() {
    const navigate = useNavigate();

    // Check if the user is currently logged in
    const isLoggedIn = !!localStorage.getItem("token");

    const handleActionClick = () => {
        if (isLoggedIn) {
            // Navigate to the BASE dashboard route
            // This matches the path: '/dashboard' in your App.jsx
            navigate('/dashboard');
        } else {
            navigate('/auth/signin');
        }
    };

    return (
        <nav>
            <div className="logo">
                <img src={logo} alt="Logo" style={{ filter: 'grayscale(1) invert(1)' }} />
                <span style={{ letterSpacing: '2px', fontWeight: '800' }}>THE VOID MAP</span>
            </div>
            <ul>
                <li><Link to='/'>SECTORS</Link></li>
                <li><Link to='/about'>PROTOCOL</Link></li>
                <li><Link to='/articles'>INTEL</Link></li>
            </ul>

            <Button onClick={handleActionClick}>
                {isLoggedIn ? "DASHBOARD" : "AUTHENTICATE"}
            </Button>
        </nav>
    )
}

export default Navbar;