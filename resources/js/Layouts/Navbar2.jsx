import { useState, useEffect } from "react";
import { Link, usePage, Head, router } from "@inertiajs/react";
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
    const { auth } = usePage().props; // Get auth from props
    const [unreadCount, setUnreadCount] = useState(0);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

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

    const fetchUnreadCount = async () => {
        try {
            const response = await axios.get(route('technician.notifications.unread-count'));
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
        const interval = setInterval(fetchUnreadCount, 30000); // Poll every 30 seconds
        
        return () => {
            clearInterval(interval);
            window.removeEventListener('updateNotificationCount', handleNotificationUpdate);
        };
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('technician.logout'), {}, {
            preserveScroll: true,
            onSuccess: () => {
                window.location.href = route('technician.login');
            },
        });
    };

    return (
        <div className="wholepage d-flex" style={{ height: "100vh" }}>
            <Head>
                <meta name="csrf-token" content={document.querySelector('meta[name="csrf-token"]').content} />
            </Head>
            <div
                className="sidebar4"
                style={{
                    width: isCollapsed ? "80px" : "250px",
                    minWidth: isCollapsed ? "80px" : "250px",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "15px",
                    transition: "width 0.3s ease-in-out",
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
            </div>

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
                        <Link
                            href={route('technician.notifications.index')}
                            className="nav-link nav-link-blue position-relative"
                        >
                            <i className="bi bi-bell-fill me-2"></i>
                            {!isCollapsed && "Notification"}
                            {unreadCount > 0 && (
                                <span className="position-absolute badge rounded-pill bg-danger" 
                                      style={{ top: '45%', transform: 'translateY(-50%)', right: '55px' }}>
                                    {unreadCount}
                                    <span className="visually-hidden">unread notifications</span>
                                </span>
                            )}
                        </Link>
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
                        <button
                            onClick={handleLogout}
                            className="btn btn-dark w-100"
                        >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            {!isCollapsed && "Log Out"}
                        </button>
                    </div>
                </ul>
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
