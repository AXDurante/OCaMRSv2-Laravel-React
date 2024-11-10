import Navbar from "../Layouts/Navbar";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import social media icons
import { Link } from "@inertiajs/react"; // Import Link for navigation
import logo from "/public/images/lesog2.png"; // Import logo image

function LandingPage() {
    const isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed

    return (
        <div id="app">
            {" "}
            {/* Main app container */}
            <div className="flex-grow">
                {" "}
                {/* This will allow the content to grow */}
                <div className="d-flex">
                    <div id="content" className="flex-fill p-3">
                        <div className="landing-section">
                            {/* Title and Description */}
                            <div className="text-overlay">
                                <div className="row">
                                    <div className="col-8 text-overlayhead">
                                        <h1 className="d-inline">
                                            Welcome, |{" "}
                                        </h1>
                                        <h1 className="d-inline fw-light">
                                            LESO - ISC
                                        </h1>
                                        <p className="landing-description">
                                            The Laboratory Equipment and
                                            Supplies Office (LESO) is a
                                            service-oriented program of the
                                            University of Santo Tomas which
                                            oversees the needs and management of
                                            all laboratories and laboratory
                                            personnel in the University.
                                        </p>

                                        {/* Updated button to use Link for navigation */}
                                        <Link href="/jobOrder/create">
                                            <button className="landing-button">
                                                Get Started
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="row mt-9">
                                    <div className="col-4"></div>
                                    <div
                                        className="col text-overlayhead2"
                                        style={{ marginBottom: "50px" }}
                                    >
                                        {isMobile ? (
                                            <>
                                                <div className="col-12 vision-section mt-4">
                                                    <h2>Vision</h2>
                                                    <p>
                                                        The Laboratory Equipment
                                                        and Supplies Office
                                                        envisions itself as a
                                                        department of competent,
                                                        compassionate
                                                        professionals committed
                                                        to quality services for
                                                        the Thomasian community.
                                                    </p>
                                                </div>
                                                <div className="col-12 mission-section mt-4">
                                                    <h2>Mission</h2>
                                                    <p>
                                                        To commit itself to
                                                        unselfish support
                                                        services to students,
                                                        faculty, and researchers
                                                        with high standards of
                                                        honesty and integrity in
                                                        managing laboratory
                                                        resources.
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="vision-section mt-4">
                                                    <h2>Vision</h2>
                                                    <p>
                                                        The Laboratory Equipment
                                                        and Supplies Office
                                                        envisions itself as a
                                                        department of competent,
                                                        compassionate
                                                        professionals committed
                                                        to quality services for
                                                        the Thomasian community.
                                                    </p>
                                                </div>
                                                <div className="mission-section mt-4">
                                                    <h2>Mission</h2>
                                                    <p>
                                                        To commit itself to
                                                        unselfish support
                                                        services to students,
                                                        faculty, and researchers
                                                        with high standards of
                                                        honesty and integrity in
                                                        managing laboratory
                                                        resources.
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Background Image */}
                            <div className="landing-image">
                                {" "}
                                <div className="landpage-logo"></div>
                            </div>
                            <div className="gradient-overlay1">
                                <div className="landing-image2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-container">
                {/* Footer content */}
                <div className="footer-social-media">
                    <a
                        href="https://www.facebook.com/USTLESO"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaFacebook />
                    </a>
                    {/* <a
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
                    </a> */}
                </div>
                <div className="footer-text">
                    <p>© 2024 LESO - ISC. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

LandingPage.layout = (page) => <Navbar>{page}</Navbar>;

export default LandingPage;
