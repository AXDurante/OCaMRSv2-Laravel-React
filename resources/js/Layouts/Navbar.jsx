import { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";

export default function NavBar({
    children,
    absolute,
    firstName,
    lastName,
    email,
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isFullyExpanded, setIsFullyExpanded] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { auth } = usePage().props;
    const mobileMenuRef = useRef(null);
    const burgerButtonRef = useRef(null);
    const [unreadCount, setUnreadCount] = useState(0);

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsCollapsed(true);
            setIsFullyExpanded(false);
        } else {
            setIsCollapsed(false);
            setIsFullyExpanded(true);
            setIsMobileMenuOpen(false);
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
            }, 300);
        } else {
            setIsFullyExpanded(false);
            setTimeout(() => {
                setIsCollapsed(true);
            }, 300);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

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

    const handleNavLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    const fetchUnreadCount = async () => {
        try {
            const response = await axios.get("/notifications/unread-count");
            setUnreadCount(response.data.count);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    useEffect(() => {
        const handleNotificationUpdate = (event) => {
            setUnreadCount(event.detail.count);
        };

        window.addEventListener(
            "updateNotificationCount",
            handleNotificationUpdate
        );

        // Initial fetch
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000);

        return () => {
            clearInterval(interval);
            window.removeEventListener(
                "updateNotificationCount",
                handleNotificationUpdate
            );
        };
    }, []);

    return (
        <div className="">
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
                                    href={route("landingpage")}
                                    className="nav-link text-white py-2"
                                    onClick={handleNavLinkClick}
                                >
                                    <i className="bi bi-house me-2"></i>
                                    <span className="small">Home</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    href="/jobOrder/create"
                                    className="nav-link text-white py-2"
                                    onClick={handleNavLinkClick}
                                >
                                    <i className="bi bi-file-earmark-text me-2"></i>
                                    <span className="small">
                                        Create Request
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    href="/jobOrder"
                                    className="nav-link text-white py-2"
                                    onClick={handleNavLinkClick}
                                >
                                    <i className="bi bi-search me-2"></i>
                                    <span className="small">Track Request</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    href={route("manageProfile")}
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
                                    href="/viewInstrument"
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
                                <Link
                                    href={route("notifications.index")}
                                    className="nav-link text-white py-2 position-relative"
                                    onClick={handleNavLinkClick}
                                >
                                    <i className="bi bi-bell-fill me-2"></i>
                                    <span className="small">Notification</span>
                                    {unreadCount > 0 && (
                                        <span
                                            className="position-absolute badge rounded-pill bg-danger"
                                            style={{
                                                top: "30%",
                                                right: "15px",
                                            }}
                                        >
                                            {unreadCount}
                                            <span className="visually-hidden">
                                                unread notifications
                                            </span>
                                        </span>
                                    )}
                                </Link>
                            </li>
                            <li className="nav-item mt-3">
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="logout-btn w-100"
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>
                                    <span className="small">Log Out</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <nav
                className="sidebar2 d-none d-md-block"
                style={{
                    width: isCollapsed ? "80px" : "250px",
                    minWidth: isCollapsed ? "80px" : "250px",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "15px",
                    transition: "width 0.3s ease-in-out",
                    overflow: "hidden",
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
                                className="bi bi-person-fill"
                                style={{ fontSize: "50px" }}
                            ></i>
                        </div>
                    </div>

                    <p
                        className={`fw-bold mb-0 mt-2 text-dark ${
                            isFullyExpanded
                                ? "expanded-content"
                                : "collapsed-content"
                        }`}
                    >
                        Welcome, {auth.user.firstName} {auth.user.lastName}
                    </p>
                </div>

                <div
                    className="sidebar rounded-right text-light"
                    style={{
                        width: isCollapsed ? "80px" : "250px",
                        minWidth: isCollapsed ? "80px" : "250px",
                        borderBottomRightRadius: "15px",
                        transition: "width 0.3s ease-in-out",
                        overflow: "hidden",
                    }}
                    onClick={handleCollapseToggle}
                >
                    <div className="sidebar-user">
                        {!isCollapsed ? (
                            <>
                                <h4 className="user-interface">Client&nbsp;</h4>
                                <h4 className="user-interface2">Interface</h4>
                            </>
                        ) : (
                            <h6>Client</h6>
                        )}
                    </div>
                    <div
                        className={`p-4 ${
                            isCollapsed
                                ? "d-flex flex-column align-items-center justify-content-center"
                                : ""
                        }`}
                    >
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link
                                    href={route("landingpage")}
                                    className={`a-nav-link ${
                                        isCollapsed ? "text-center" : ""
                                    }`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <a className="nav-link">
                                        <i className="bi bi-house me-2"></i>
                                        {!isCollapsed && "Home"}
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    href="/jobOrder/create"
                                    className={`a-nav-link ${
                                        isCollapsed ? "text-center" : ""
                                    }`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <a className="nav-link">
                                        <i className="bi bi-file-earmark-text me-2"></i>
                                        {!isCollapsed && "Create Request"}
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    href="/jobOrder"
                                    className={`a-nav-link ${
                                        isCollapsed ? "text-center" : ""
                                    }`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <a className="nav-link">
                                        <i className="bi bi-search me-2"></i>
                                        {!isCollapsed && "Track Request"}
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    href={route("manageProfile")}
                                    className={`a-nav-link ${
                                        isCollapsed ? "text-center" : ""
                                    }`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <a className="nav-link">
                                        <i className="bi bi-person-fill me-2"></i>
                                        {!isCollapsed && "Manage Profile"}
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    href="/viewInstrument"
                                    className={`a-nav-link ${
                                        isCollapsed ? "text-center" : ""
                                    }`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <a className="nav-link">
                                        <i className="bi bi-list me-2"></i>
                                        {!isCollapsed && "Instrument List"}
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    href={route("notifications.index")}
                                    className="nav-link position-relative"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i className="bi bi-bell-fill me-2"></i>
                                    {!isCollapsed && "Notification"}
                                    {unreadCount > 0 && (
                                        <span
                                            className="position-absolute badge rounded-pill bg-danger"
                                            style={{
                                                top: "45%",
                                                transform: "translateY(-50%)",
                                                right: "30px",
                                            }}
                                        >
                                            {unreadCount}
                                            <span className="visually-hidden">
                                                unread notifications
                                            </span>
                                        </span>
                                    )}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className={`logout-btn ${
                                        isCollapsed ? "collapsed" : ""
                                    }`}
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>
                                    {!isCollapsed && "Log Out"}{" "}
                                    {/* Show 'Log Out' only when fully expanded */}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
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
