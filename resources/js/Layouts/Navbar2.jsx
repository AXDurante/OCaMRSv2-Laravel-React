import { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function NavBar({
    children,
    absolute,
    firstName,
    lastName,
    email,
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isFullyExpanded, setIsFullyExpanded] = useState(true); // For handling transition timing
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Add this state
    const { auth } = usePage().props; // Get auth from props
    const mobileMenuRef = useRef(null); // Add refs
    const burgerButtonRef = useRef(null);

    // Fallback for auth
    const userFirstName = auth?.user?.firstName || "Guest"; // Use "Guest" if firstName is not available
    const userLastName = auth?.user?.lastName || ""; // Use empty string if lastName is not available

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsCollapsed(true);
            setIsFullyExpanded(false);
        } else {
            setIsCollapsed(false);
            setIsFullyExpanded(true);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleCollapseToggle = () => {
        if (isCollapsed) {
            setIsCollapsed(false);
            setTimeout(() => {
                setIsFullyExpanded(true);
            }, 300); // Delay to match transition time
        } else {
            setIsFullyExpanded(false);
            setTimeout(() => {
                setIsCollapsed(true);
            }, 300);
        }
    };

    // Add these new functions
    const handleNavLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Add click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMobileMenuOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                !burgerButtonRef.current.contains(event.target)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        const handleScroll = () => {
            if (isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("scroll", handleScroll);
        };
    }, [isMobileMenuOpen]);

    return (
        <div className="">
            {/* Add Mobile Menu */}
            <div className="d-md-none fixed-top bg-dark">
                <div className="d-flex justify-content-between align-items-center p-3">
                    <div className="mobile-header-logo">
                        <img
                            src="/images/lesologonav.png"
                            alt="LESO Logo"
                            className="mobile-logo-img"
                        />
                        <h4 className="text-white mb-0">LESO - ISC</h4>
                    </div>
                    <button
                        ref={burgerButtonRef}
                        className="navbar-toggler border-0"
                        onClick={toggleMobileMenu}
                    >
                        <i className="bi bi-list text-white fs-2"></i>
                    </button>
                </div>

                <div
                    ref={mobileMenuRef}
                    className={`mobile-menu ${isMobileMenuOpen ? "show" : ""}`}
                >
                    <div className="bg-dark p-3">
                        <div className="text-center mb-2">
                            <div
                                className="rounded-circle bg-white d-inline-flex justify-content-center align-items-center mb-2"
                                style={{ width: "45px", height: "45px" }}
                            >
                                <i
                                    className="bi bi-person-fill text-dark"
                                    style={{ fontSize: "24px" }}
                                ></i>
                            </div>
                            <p className="text-white mb-2 small">
                                Welcome, {auth.user.firstName}{" "}
                                {auth.user.lastName}
                            </p>
                        </div>

                        <ul className="nav flex-column nav-compact">
                            <li className="nav-item">
                                <Link
                                    href={route("technician.dashboard")}
                                    className="nav-link text-white py-2"
                                    onClick={handleNavLinkClick}
                                >
                                    <i className="bi bi-search me-2"></i>
                                    <span className="small">Track Request</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    href={route("technician.manageProfile")}
                                    className="nav-link text-white py-2"
                                    onClick={handleNavLinkClick}
                                >
                                    <i className="bi bi-person-fill me-2"></i>
                                    <span className="small">
                                        Manage Profile
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    href={route("technician.viewInstrument")}
                                    className="nav-link text-white py-2"
                                    onClick={handleNavLinkClick}
                                >
                                    <i className="bi bi-list me-2"></i>
                                    <span className="small">
                                        Instrument List
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-white py-2"
                                    href="#"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNavLinkClick();
                                    }}
                                >
                                    <i className="bi bi-bell-fill me-2"></i>
                                    <span className="small">Notification</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-white py-2"
                                    href="#"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNavLinkClick();
                                    }}
                                >
                                    <i className="bi bi-arrow-left me-2"></i>
                                    <span className="small">Go Back</span>
                                </a>
                            </li>
                            <li className="nav-item mt-3">
                                <Link
                                    href={route("technician.logout")}
                                    method="post"
                                    as="button"
                                    className="logout-btn w-100"
                                    onClick={handleNavLinkClick}
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>
                                    <span className="small">Log Out</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Existing sidebar code - add d-none d-md-block to hide on mobile */}
            <n
                className="sidebar4 d-none d-md-block"
                style={{
                    width: isCollapsed ? "80px" : "250px",
                    minWidth: isCollapsed ? "80px" : "250px",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "15px",
                    transition: "width 0.3s ease-in-out",
                }}
                onClick={handleCollapseToggle}
            >
                <div className="mt-4 d-flex flex-column align-items-center">
                    <h4
                        className={`text-black pt-4 ${
                            isFullyExpanded
                                ? "expanded-content"
                                : "collapsed-content"
                        }`}
                        id="textHeader"
                    >
                        LESO - ISC
                    </h4>
                    <div
                        className={`${
                            isFullyExpanded
                                ? "expanded-content"
                                : "collapsed-content"
                        }`}
                    >
                        <div
                            className="rounded-circle bg-dark d-flex justify-content-center align-items-center mt-4 shadow"
                            style={{
                                width: "100px",
                                height: "100px",
                                color: "white",
                                transition: "opacity 0.3s ease-in-out",
                            }}
                        >
                            <i
                                className="bi bi-person-fill text-primary"
                                style={{ fontSize: "50px" }}
                            ></i>
                        </div>
                    </div>
                    {isFullyExpanded && (
                        <p className="mt-2">
                            Welcome, {userFirstName} {userLastName}{" "}
                            {/* Display full name */}
                        </p>
                    )}
                </div>
            </n>

            <nav
                className="sidebar rounded-right text-light"
                style={{
                    width: isCollapsed ? "80px" : "250px",
                    minWidth: isCollapsed ? "80px" : "250px",
                    borderBottomRightRadius: "15px",
                    transition: "width 0.3s ease-in-out",
                    overflow: "hidden",
                }}
                onClick={handleCollapseToggle} // Toggle collapse on click
            >
                <div className="sidebar-user">
                    {!isCollapsed ? (
                        <>
                            <h4 className="user-interface">Technician&nbsp;</h4>
                            <h4 className="user-interface2">Interface</h4>
                        </>
                    ) : (
                        <h6>Tech</h6>
                    )}
                </div>
                <ul className="nav flex-column pt-4 theNav">
                    <li
                        className="a-nav-link"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Link
                            href={route("technician.dashboard")}
                            className="a-nav-link"
                        >
                            <a className="nav-link nav-link-blue">
                                <i className="bi bi-search me-2"></i>
                                {!isCollapsed && "Track Request"}
                            </a>
                        </Link>
                    </li>
                    <li
                        className="a-nav-link"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Link
                            href={route("technician.manageProfile")}
                            className="nav-link nav-link-blue"
                        >
                            <i className="bi bi-person-fill me-2"></i>
                            {!isCollapsed && "Manage Profile"}
                        </Link>
                    </li>
                    <li
                        className="a-nav-link"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Link
                            href={route("technician.viewInstrument")} // Updated to use the named route for viewing instruments
                            className="nav-link nav-link-blue"
                        >
                            <i className="bi bi-list me-2"></i>
                            {!isCollapsed && "Instrument List"}
                        </Link>
                    </li>
                    <li
                        className="a-nav-link"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <a className="nav-link" href="#">
                            <i className="bi bi-bell-fill me-2 "></i>
                            {!isCollapsed && "Notification"}
                        </a>
                    </li>
                    <li
                        className="a-nav-link"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <a className="nav-link" href="#">
                            <i className="bi bi-arrow-left me-2 icon-bold"></i>
                            {!isCollapsed && "Go Back"}
                        </a>
                    </li>
                    <div className="p-3">
                        <Link
                            href={route("technician.logout")}
                            method="post"
                            as="button"
                            className="btn btn-dark w-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            {!isCollapsed && "Log Out"}{" "}
                            {/* Show 'Log Out' only when fully expanded */}
                        </Link>
                    </div>
                </ul>
            </nav>
            <main
                className="flex-fill p-3"
                style={{
                    marginLeft:
                        window.innerWidth >= 768
                            ? isCollapsed
                                ? "80px"
                                : "250px"
                            : "0",
                    marginTop: window.innerWidth < 768 ? "60px" : "0",
                    transition: "margin-left 0.3s ease-in-out",
                }}
            >
                {children}
            </main>
        </div>
    );
}
