import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/react.svg'; // You can replace this later with a biohazard or skull icon
import Button from './Button';

function Navbar() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('auth/signin');
    };

    return (
        <nav>
            <div className="logo">
                <img src={logo} alt="Logo" style={{ filter: 'grayscale(1) invert(1)' }} />
                <span style={{ letterSpacing: '2px', fontWeight: '800' }}>THE VOID MAP</span>
            </div>
            <ul>
                <li>
                    <Link to='/'>SECTORS</Link>
                </li>
                <li>
                    <Link to='/about'>PROTOCOL</Link>
                </li>
                <li>
                    <Link to='/articles'>INTEL</Link>
                </li>
            </ul>
            <Button onClick={handleLoginClick}>AUTHENTICATE</Button>
        </nav>
    )
}

export default Navbar