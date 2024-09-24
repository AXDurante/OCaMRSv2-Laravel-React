import Navbar from "../Layouts/Navbar";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import social media icons
import logo from "/public/images/lesog2.png"; // Import logo image

function LandingPage() {
    return (
        <div className="d-flex">
            <div id="content" className="main-content flex-fill p-3">
                <div className="landing-section">
                    {/* Title and Description */}
                    <div className="text-overlay">
                        <h1 className="d-inline">Welcome, | </h1>
                        <h1 className="d-inline fw-light">LESO - ISC</h1>
                        <p className="landing-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Phasellus imperdiet, nulla et dictum interdum,
                            nisi lorem egestas odio.
                        </p>
                        <button className="landing-button">Get Started</button>
                    </div>

                    {/* Background Image */}
                    <div className="landing-image">
                        <div className="landpage-logo"></div>
                    </div>
                    <div className="gradient-overlay1">
                        <div className="landing-image2"></div>
                    </div>
                </div>

                <div className="footer-container">
                    <div className="footer-social-media">
                        <a
                            href="https://www.facebook.com/USTLESO"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaInstagram />
                        </a>
                    </div>
                    <div className="footer-text">
                        <p>© 2024 LESO - ISC. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

LandingPage.layout = (page) => <Navbar>{page}</Navbar>;

export default LandingPage;
