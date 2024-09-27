import { useState, useEffect } from "react"; // {{ edit_1 }}
import { Link } from "@inertiajs/react";

export default function AdminNavBar({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false); // {{ edit_2 }}

    // Function to handle window resize
    const handleResize = () => {
        if (window.innerWidth < 768) {
            // Adjust the breakpoint as needed
            setIsCollapsed(true);
        } else {
            setIsCollapsed(false);
        }
    };

    useEffect(() => {
        // Set initial state based on window size
        handleResize();
        // Add event listener for resize
        window.addEventListener("resize", handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="d-flex ">
            {/* Sidebar */}
            <nav
                className={`bg-dark rounded-right ${
                    isCollapsed ? "collapsed" : ""
                }`} // {{ edit_3 }}
                style={{
                    width: isCollapsed ? "80px" : "250px",
                    height: "100vh",
                    position: "fixed",
                    borderTopRightRadius: "30px", // Rounded top right corner
                    borderBottomRightRadius: "30px", // Rounded bottom right corner
                }} // {{ edit_4 }}
                onClick={() => setIsCollapsed(!isCollapsed)} // {{ edit_5 }}
            >
                <div className="p-4 ">
                    <h5
                        className={`sidebar-heading text-light ${
                            isCollapsed ? "d-none" : ""
                        }`}
                    >
                        {/* {{ edit_6 }} */}
                        Admin Dashboard
                    </h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <Link href="/admin" className="nav-link">
                                <i className="bi bi-file-earmark-text me-2"></i>
                                {!isCollapsed && "Job Request"}{" "}
                                {/* {{ edit_7 }} */}
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link
                                href="/admin/account-handler"
                                className="nav-link"
                            >
                                <i className="bi bi-person-add me-2"></i>
                                {!isCollapsed && "Account Handler"}{" "}
                                {/* {{ edit_8 }} */}
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link
                                href="/admin/manage-profile"
                                className="nav-link"
                            >
                                <i className="bi bi-person-fill me-2"></i>
                                {!isCollapsed && "Manage Profile"}{" "}
                                {/* {{ edit_9 }} */}
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <a className="nav-link" href="#">
                                <i className="bi bi-list me-2"></i>
                                {!isCollapsed && "Instrument List"}{" "}
                                {/* {{ edit_10 }} */}
                            </a>
                        </li>
                        <li className="nav-item mb-2">
                            <a className="nav-link" href="#">
                                <i className="bi bi-arrow-left me-2"></i>
                                {!isCollapsed && "Go Back"}{" "}
                                {/* {{ edit_11 }} */}
                            </a>
                        </li>
                        <li className="nav-item mt-3">
                            <Link
                                href={route("admin.logout")}
                                method="post"
                                as="button"
                                className="btn btn-danger"
                            >
                                <i className="bi bi-box-arrow-right me-2"></i>
                                {!isCollapsed && "Log Out"}{" "}
                                {/* {{ edit_12 }} */}
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <div
                className="flex-grow-1"
                style={{
                    marginLeft: isCollapsed ? "80px" : "250px",
                    padding: "20px",
                }} // {{ edit_13 }}
            >
                {children}
            </div>
        </div>
    );
}
