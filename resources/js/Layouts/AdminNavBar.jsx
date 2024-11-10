import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";

export default function AdminNavBar({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isFullyExpanded, setIsFullyExpanded] = useState(true); // For handling transition timing

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
            // Expanding the navbar
            setIsCollapsed(false);
            setTimeout(() => {
                setIsFullyExpanded(true);
            }, 300); // Delay to match transition time
        } else {
            // Collapsing the navbar
            setIsFullyExpanded(false);
            setTimeout(() => {
                setIsCollapsed(true);
            }, 300);
        }
    };

    return (
        <div className="d-flex">
            <nav
                className={`shadow ${isCollapsed ? "collapsed" : ""}`}
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
                                {isFullyExpanded && "Sir Alferos!"}
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
                                <a
                                    className="a-nav-link"
                                    href="#"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i className="bi bi-arrow-left me-2 fs-4"></i>
                                    {!isCollapsed && "Go Back"}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="p-4">
                        <Link
                            href={route("admin.logout")}
                            method="post"
                            as="button"
                            className="btn btn-dark w-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            {!isCollapsed && "Log Out"}
                        </Link>
                    </div>
                </div>
            </nav>

            <div
                className="flex-grow-1"
                style={{
                    marginLeft: isCollapsed ? "80px" : "250px",
                    padding: "20px",
                    transition: "margin-left 0.3s ease-in-out",
                }}
            >
                {children}
            </div>
        </div>
    );
}
