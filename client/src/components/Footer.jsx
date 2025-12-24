import React from 'react';
import '../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="terminal-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>BROADCAST_LOG</h4>
                    <p>
                        Mapping the fallout. Documenting the silence. This terminal is maintained 
                        by the survivors of Sector-0 for those still listening.
                    </p>
                </div>
                <div className="footer-section">
                    <h4>COMM_CHANNELS</h4>
                    <p>Secure Mail: scout@thevoidmap.dark</p>
                    <p>Frequency: 144.1 MHz (Emergency Only)</p>
                </div>
                <div className="footer-section">
                    <h4>ENCRYPTED_LINKS</h4>
                    <div className="social-links">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                    <p>
                        EST. YEAR ZERO | [{currentYear}] THE VOID MAP DATABASE | NO DATA FLUFF ALLOWED.
                    </p>
            </div>
        </footer>
    );
}

export default Footer;