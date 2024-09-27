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
        <div className="d-flex">
            {/* Sidebar */}
            <nav
                className={`shadow ${isCollapsed ? "collapsed" : ""}`}
                style={{
                    width: isCollapsed ? "80px" : "250px",
                    height: "100vh",
                    position: "fixed",
                    borderTopRightRadius: "30px", // Rounded top right corner
                    borderBottomRightRadius: "30px", // Rounded bottom right corner
                    overflow: "hidden", // Prevents overflow
                }}
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <div className="bg-white h-30">
                    {" "}
                    <div className="d-flex flex-column align-items-center text-center">
                        <h4 className="text-black mt-7" id="textHeader">
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
                                class="bi bi-person-fill"
                                style={{
                                    fontSize: "50px",
                                }}
                            ></i>
                        </div>

                        <div className="d-flex flex-column">
                            <p className="mt-2 mb-0">Welcome Back</p>{" "}
                            {/* No bottom margin */}
                            <p className="fw-bold mb-0">Sir Alferos!</p>{" "}
                            {/* No bottom margin */}
                        </div>
                    </div>
                </div>
                <div className="bg-yellow h-70 rounded-right">
                    <h6
                        className={`bg-dark sidebar-heading text-light p-1 text-center ${
                            isCollapsed ? "d-none" : ""
                        }`}
                        style={{ width: "100%" }} // {{ edit_6 }}
                    >
                        Admin Dashboard
                    </h6>
                    <div className="p-4 mt-4">
                        <ul className="nav flex-column">
                            <li className="mb-2">
                                <Link
                                    href="/admin"
                                    className="a-nav-link"
                                    onClick={(e) => e.stopPropagation()} // {{ edit_7 }}
                                >
                                    <i className="bi bi-file-earmark-text me-2"></i>
                                    {!isCollapsed && "Job Request"}{" "}
                                    {/* {{ edit_8 }} */}
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link
                                    href="/admin/account-handler"
                                    className="a-nav-link"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i className="bi bi-person-add me-2"></i>
                                    {!isCollapsed && "Account Handler"}{" "}
                                    {/* {{ edit_9 }} */}
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link
                                    href="/admin/manage-profile"
                                    className="a-nav-link"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i className="bi bi-person-fill me-2"></i>
                                    {!isCollapsed && "Manage Profile"}{" "}
                                    {/* {{ edit_10 }} */}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <a
                                    className="a-nav-link"
                                    href="#"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i className="bi bi-list me-2"></i>
                                    {!isCollapsed && "Instrument List"}{" "}
                                    {/* {{ edit_11 }} */}
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    className="a-nav-link"
                                    href="#"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i className="bi bi-arrow-left me-2"></i>
                                    {!isCollapsed && "Go Back"}{" "}
                                    {/* {{ edit_12 }} */}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="p-4 ">
                        <Link
                            href={route("admin.logout")}
                            method="post"
                            as="button"
                            className="btn btn-danger w-100 "
                            onClick={(e) => e.stopPropagation()}
                        >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            {!isCollapsed && "Log Out"} {/* {{ edit_13 }} */}
                        </Link>{" "}
                    </div>
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
