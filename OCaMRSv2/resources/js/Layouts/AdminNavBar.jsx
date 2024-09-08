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
                <div className="sidebar-headeradmin">
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
                        <Link href="/admin">
                            <a className="nav-link">
                                <i className="bi bi-file-earmark-text me-2"></i>
                                Job Request
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/admin/account-handler">
                            <a className="nav-link">
                                <i class="bi bi-person-add me-2"></i>Account
                                Handler
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/admin/manage-profile">
                            <a className="nav-link">
                                <i className="bi bi-person-fill me-2"></i>Manage
                                Profile
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/admin/viewinstrument-admin">
                            <a className="nav-link">
                                <i className="bi bi-list me-2"></i>Instrument
                                List
                            </a>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi bi-arrow-left me-2 icon-bold"></i>
                            Go Back
                        </a>
                    </li>
                    <div className="logoutadmin">
                        <li className="nav-item-logoutadmin">
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="logout-btnadmin"
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
