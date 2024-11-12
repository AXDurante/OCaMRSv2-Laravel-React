import { useState, useEffect } from "react";
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
    const [isFullyExpanded, setIsFullyExpanded] = useState(true); // For handling transition timing
    const { auth } = usePage().props;
    const [unreadCount, setUnreadCount] = useState(0);

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

    const fetchUnreadCount = async () => {
        try {
            const response = await axios.get('/notifications/unread-count');
            setUnreadCount(response.data.count);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        const handleNotificationUpdate = (event) => {
            setUnreadCount(event.detail.count);
        };

        window.addEventListener('updateNotificationCount', handleNotificationUpdate);
        
        // Initial fetch
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000);
        
        return () => {
            clearInterval(interval);
            window.removeEventListener('updateNotificationCount', handleNotificationUpdate);
        };
    }, []);

    return (
        <div className="">
            <nav
                className="sidebar2"
                style={{
                    width: isCollapsed ? "80px" : "250px",
                    minWidth: isCollapsed ? "80px" : "250px",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "15px",
                    transition: "width 0.3s ease-in-out",
                    overflow: "hidden",
                }}
                onClick={handleCollapseToggle} // Toggle collapse on click
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
                    onClick={handleCollapseToggle} // Toggle collapse on click
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
                                    href={route('notifications.index')}
                                    className="nav-link position-relative"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i className="bi bi-bell-fill me-2"></i>
                                    {!isCollapsed && "Notification"}
                                    {unreadCount > 0 && (
                                        <span className="position-absolute badge rounded-pill bg-danger" 
                                              style={{ top: '45%', transform: 'translateY(-50%)', right: '30px' }}>
                                            {unreadCount}
                                            <span className="visually-hidden">unread notifications</span>
                                        </span>
                                    )}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${
                                        isCollapsed ? "text-center" : ""
                                    }`}
                                    href="#"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i className="bi bi-arrow-left me-2 icon-bold"></i>
                                    {!isCollapsed && "Go Back"}
                                </a>
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
                    marginLeft: isCollapsed ? "80px" : "250px",
                    transition: "margin-left 0.3s ease-in-out",
                }}
            >
                {children}
            </main>
        </div>
    );
}
