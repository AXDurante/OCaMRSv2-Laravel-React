import { Link } from "@inertiajs/react";

export default function NavBar({ children }) {
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
                    <h3 className="user-interface">Client</h3>
                    <h3 className="user-interface2">Interface</h3>
                </div>
                <ul className="nav flex-column pt-5">
                    <li className="nav-item">
                        <Link href="/jobOrder/create">
                            Create Request
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/jobOrder">
                            Track Request
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Manage Profile
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Instrument List
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Notification
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
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
