import { useState, useEffect } from "react";
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
    const { auth } = usePage().props; // Get auth from props

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

    return (
        <div className="wholepage d-flex" style={{ height: "100vh" }}>
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
                        className="rounded-circle bg-dark d-flex justify-content-center align-items-center mt-4 shadow"
                        style={{
                            width: "100px",
                            height: "100px",
                            color: "white",
                        }}
                    >
                        <i
                            className="bi bi-person-fill text-primary"
                            style={{ fontSize: "50px" }}
                        ></i>
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
                        <h6>Te</h6>
                    )}
                </div>
                <ul className="nav flex-column pt-4 theNav">
                   
                    <li
                        className="nav-item"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Link href={route("technician.dashboard")}>
                            <a className="nav-link nav-link-blue">
                                <i className="bi bi-search me-2"></i>
                                {!isCollapsed && "Track Request"}
                            </a>
                        </Link>
                    </li>
                    <li
                        className="nav-item"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Link
                           href={route('technician.manageProfile')}
                            className="nav-link nav-link-blue"
                        >
                            <i className="bi bi-person-fill me-2"></i>
                            {!isCollapsed && "Manage Profile"}
                        </Link>
                    </li>
                    <li
                        className="nav-item"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Link href="/viewInstrument">
                            <a className="nav-link nav-link-blue">
                                <i className="bi bi-list me-2"></i>
                                {!isCollapsed && "Instrument List"}
                            </a>
                        </Link>
                    </li>
                    <li
                        className="nav-item"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <a className="nav-link" href="#">
                            <i className="bi bi-bell-fill me-2 "></i>
                            {!isCollapsed && "Notification"}
                        </a>
                    </li>
                    <li
                        className="nav-item"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <a className="nav-link" href="#">
                            <i className="bi bi-arrow-left me-2 icon-bold"></i>
                            {!isCollapsed && "Go Back"}
                        </a>
                    </li>
                    <div className="logout">
                        <li
                            className="nav-item-logout"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Link
                                href={route("technician.logout")}
                                method="post"
                                as="button"
                                className="logout-blue-btn"
                            >
                                <i className="bi bi-box-arrow-right me-2"></i>
                                {!isCollapsed && "Log Out"}{" "}
                                {/* Show 'Log Out' only when fully expanded */}
                            </Link>
                        </li>
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
