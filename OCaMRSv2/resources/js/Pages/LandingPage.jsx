import Navbar from "../Layouts/Navbar";

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
                    <div className="landing-image"></div>
                </div>
            </div>
        </div>
    );
}

LandingPage.layout = (page) => <Navbar>{page}</Navbar>;

export default LandingPage;
