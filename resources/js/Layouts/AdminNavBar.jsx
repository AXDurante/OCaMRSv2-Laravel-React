import { useState, useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import axios from "axios";

export default function AdminNavBar({ children }) {
    const { auth } = usePage().props;
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isFullyExpanded, setIsFullyExpanded] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            const mobileMenu = document.querySelector(".mobile-menu");
            const navbarToggler = document.querySelector(".navbar-toggler");

            if (
                isMobileMenuOpen &&
                mobileMenu &&
                !mobileMenu.contains(event.target) &&
                navbarToggler &&
                !navbarToggler.contains(event.target)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    const handleCollapseToggle = () => {
        if (window.innerWidth < 768) {
            setIsMobileMenuOpen(!isMobileMenuOpen);
        } else {
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
        }
    };

    const fetchUnreadCount = async () => {
        try {
            const response = await axios.get(
                route("admin.notifications.unread-count")
            );
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
        const interval = setInterval(fetchUnreadCount, 30000); // Poll every 30 seconds

        return () => {
            clearInterval(interval);
            window.removeEventListener(
                "updateNotificationCount",
                handleNotificationUpdate
            );
        };
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(
            route("admin.logout"),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    window.location.href = route("admin.login");
                },
            }
        );
    };

    const navLinks = [
        { href: "/admin", icon: "bi-file-earmark-text", text: "Job Request" },
        {
            href: "/admin/account-handler",
            icon: "bi-person-add",
            text: "Account Handler",
        },
        {
            href: "/admin/manage-profile",
            icon: "bi-person-fill",
            text: "Manage Profile",
        },
        {
            href: "/admin/view-instrument",
            icon: "bi-list",
            text: "Instrument List",
        },
        {
            href: route("admin.notifications.index"),
            icon: "bi-bell-fill",
            text: "Notification",
        },
    ];

    return (
        <div className="">
            <div
                className={`d-md-none fixed-top bg-blue shadow-sm ${
                    isMobileMenuOpen ? "d-none" : ""
                }`}
            >
                <div className="d-flex justify-content-between align-items-center p-3">
                    <div className="mobile-header-logo">
                        <span className="text-white fs-5">LESO - ISC</span>
                    </div>
                    <button
                        className="navbar-toggler border-0"
                        onClick={handleCollapseToggle}
                        aria-label="Toggle navigation"
                    >
                        <i
                            className={`bi ${
                                isMobileMenuOpen ? "bi-x" : "bi-list"
                            } fs-2 text-white`}
                        ></i>
                    </button>
                </div>
            </div>

            <div className={`mobile-menu ${isMobileMenuOpen ? "show" : ""}`}>
                <div className="p-4 text-white">
                    <div className="text-center mb-4">
                        <div
                            className="rounded-circle bg-dark d-flex justify-content-center align-items-center mx-auto mb-3"
                            style={{ width: "80px", height: "80px" }}
                        >
                            <i
                                className="bi bi-person-fill text-primary"
                                style={{ fontSize: "40px" }}
                            ></i>
                        </div>
                        <p className="mb-0">Welcome Back</p>
                        <p className="fw-bold mb-0">
                            {auth?.user?.lastName
                                ? `Sir ${auth.user.lastName}!`
                                : "Admin!"}
                        </p>
                    </div>

                    <ul className="nav flex-column nav-compact">
                        {navLinks.map((link, index) => (
                            <li className="nav-item" key={index}>
                                <Link
                                    href={link.href}
                                    className="nav-link text-white d-flex align-items-center py-3 position-relative"
                                    onClick={(e) => {
                                        if (link.href === "#")
                                            e.preventDefault();
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <i
                                        className={`bi ${link.icon} me-3 fs-4`}
                                    ></i>
                                    {link.text}
                                    {link.icon === "bi-bell-fill" &&
                                        unreadCount > 0 && (
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
                        ))}
                        <li className="nav-item">
                            <Link
                                href={route("admin.logout")}
                                method="post"
                                as="button"
                                className="nav-link text-white d-flex align-items-center py-3 w-100 border-0 bg-transparent"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <i className="bi bi-box-arrow-right me-3 fs-4"></i>
                                Log Out
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <nav
                className={`shadow d-none d-md-block ${
                    isCollapsed ? "collapsed" : ""
                }`}
                style={{
                    width: isCollapsed ? "80px" : "250px",
                    height: "100vh",
                    position: "fixed",
                    borderTopRightRadius: "30px",
                    borderBottomRightRadius: "30px",
                    overflow: "hidden",
                    transition: "width 0.3s ease-in-out",
                }}
                onClick={handleCollapseToggle}
            >
                <div className="bg-blue h-30">
                    <div className="d-flex flex-column align-items-center text-center">
                        <h4
                            className={`text-dark mt-7 ${
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

                        <div className="d-flex flex-column">
                            <p
                                className={`mt-2 mb-0 text-dark ${
                                    isFullyExpanded
                                        ? "expanded-content"
                                        : "collapsed-content"
                                }`}
                            >
                                {isFullyExpanded && "Welcome Back"}
                            </p>
                            <p
                                className={`fw-bold mb-0 text-dark ${
                                    isFullyExpanded
                                        ? "expanded-content"
                                        : "collapsed-content"
                                }`}
                            >
                                {isFullyExpanded && auth?.user?.lastName
                                    ? `Sir ${auth.user.lastName}!`
                                    : "Admin!"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-charcoal h-70 rounded-right">
                    <div
                        className={`${
                            isCollapsed ? "bg-black" : "bg-dark"
                        } sidebar-heading text-light p-1 text-center`}
                        style={{ width: "100%" }}
                    >
                        {!isCollapsed ? (
                            <>
                                <h4 className="user-interface">Admin&nbsp;</h4>
                                <h4 className="user-interface2">Interface</h4>
                            </>
                        ) : (
                            <h6>Admin</h6>
                        )}
                    </div>
                    <div className="p-4 mt-4">
                        <ul className="nav flex-column">
                            <li className="mb-2">
                                <Link
                                    href="/admin"
                                    className="a-nav-link"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i className="bi bi-file-earmark-text me-2 fs-4"></i>
                                    {!isCollapsed && "Job Request"}
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link
                                    href="/admin/account-handler"
                                    className="a-nav-link"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i className="bi bi-person-add me-2"></i>
                                    {!isCollapsed && "Account Handler"}
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link
                                    href="/admin/manage-profile"
                                    className="a-nav-link"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i className="bi bi-person-fill me-2 fs-4"></i>
                                    {!isCollapsed && "Manage Profile"}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    className="a-nav-link"
                                    href="/admin/view-instrument"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i className="bi bi-list me-2 fs-4"></i>
                                    {!isCollapsed && "Instrument List"}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href={route("admin.notifications.index")}
                                    className="a-nav-link position-relative"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i className="bi bi-bell-fill me-2 fs-4"></i>
                                    {!isCollapsed && "Notification"}
                                    {unreadCount > 0 && (
                                        <span
                                            className={`position-absolute top-0 badge rounded-pill bg-danger ${
                                                isCollapsed
                                                    ? "start-50"
                                                    : "start-100 translate-middle ms-3"
                                            }`}
                                        >
                                            {unreadCount}
                                            <span className="visually-hidden">
                                                unread notifications
                                            </span>
                                        </span>
                                    )}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="p-4">
                        <button
                            onClick={handleLogout}
                            className="btn btn-dark w-100"
                            type="button"
                        >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            {!isCollapsed && "Log Out"}
                        </button>
                    </div>
                </div>
            </nav>

            <div
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
            </div>
        </div>
    );
}
