import { Link } from "@inertiajs/react";

export default function AdminNavBar({ children }) {
    return (
        <div className="wholepage d-flex" style={{ height: "100vh" }}>
            <nav
                className="sidebar rounded-right text-light"
                style={{
                    width: "250px",
                    minWidth: "250px",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "15px",
                }}
            >
                <div className="sidebar-header">
                    <h4 className="text-black" id="textHeader">
                        LESO - ISC
                    </h4>
                </div>
                <div className="sidebar-user">
                    <h3 className="user-interface">Admin</h3>
                    <h3 className="user-interface2">Interface</h3>
                </div>
                <ul className="nav flex-column pt-5">
                    <li className="nav-item">
                        <Link href="/jobOrder/create">
                            <a className="nav-link">
                                <i className="bi bi-file-earmark-text me-2"></i>
                                Open Request
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/jobOrder">
                            <a className="nav-link">
                                <i className="bi bi-search me-2"></i>Track
                                Request
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/manage profile">
                            <a className="nav-link">
                                <i className="bi bi-person-fill me-2"></i>Manage
                                Profile
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi bi-list me-2"></i>Instrument List
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi bi-bell-fill me-2 "></i>
                            Notification
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi bi-arrow-left me-2 icon-bold"></i>
                            Go Back
                        </a>
                    </li>
                    <div className="logout">
                        <li className="nav-item-logout">
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="logout-btn"
                            >
                                Log Out
                            </Link>
                        </li>
                    </div>
                </ul>
            </nav>
            <main className="flex-fill p-3">{children}</main>
        </div>
    );
}
